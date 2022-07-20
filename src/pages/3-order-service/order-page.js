import React, {useContext, useEffect, useState} from "react";

import {Button, Card, Col, message, Modal, notification, Rate, Row, Steps, Typography,} from "antd";

import SelectedOfferCard from "../../components/selected-offer-card";
import SelectedCatalogItemCard from "../../components/selected-catalog-item-card";
import {CatalogContext, OfferContext, StateContext} from "../../constant";
import RatingResultCard from "../../components/rating-result-card";
import {OrderClient} from "../../grpc/orderpb/order.client";
import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";

const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:8000"
});

const order_client = new OrderClient(transport);

const {Step} = Steps;

const steps = [
    {title: "Waiting"},
    {title: "In Progress"},
    {title: "Completed"},
];

function OrderService() {
    const [globalState, setGlobalState] = useContext(StateContext);

    const [orderTrackingStep, setOrderTrackingStep] = useState(0);

    const [selectedCatalogItem, _] = useContext(CatalogContext);
    const [selectedOffer, __] = useContext(OfferContext);

    const [orderId, setOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderDetailsStreamCompleted, setOrderDetailsStreamCompleted] =
        useState(false);

    const [rating, setRating] = useState(0);

    const [modalInfo, setModalInfo] = useState({open: false});

    useEffect(async () => {
        try {
            const call = order_client.createOrder({
                offerId: selectedOffer.id
            })

            const response = await call.response;
            setOrderId(response.id);
            notification.success({
                message: "Order Service",
                description: "CreateOrder completed",
                duration: 1,
            });
        } catch (e) {
            notification.error({
                message: "Order Service",
                description: "Error at CreateOrder",
                duration: 1,
            });
        }
    }, []);

    useEffect(async () => {
        if (orderId) {
            setOrderDetailsStreamCompleted(false);

            let data = [];

            try {
                let stream = order_client.getOrderDetailStream({
                    id: orderId
                });

                for await (let response of stream.responses) {
                    data.push(response);
                    setOrderDetails([...data]);
                    setOrderTrackingStep(Math.max(0, Math.ceil(data.length / 2) - 1));
                    message.info(`One New Detail, Total: ${data.length}`, 0.5);
                }

                notification.success({
                    message: "Order Service",
                    description: "GetOrderDetailStream completed",
                    duration: 2,
                });

                setOrderDetailsStreamCompleted(true);
            } catch (e) {
                notification.error({
                    message: "Order Service",
                    description: "Error at GetOrderDetailStream",
                    duration: 2,
                })
            }
        }
    }, [orderId]);

    const handleOrderCompletion = async () => {
        try {
            const call = order_client.handleOrderCompletion({
                id: orderId,
                rating: rating
            });

            const rsp = await call.response
            setModalInfo({
                open: true,
                content: {
                    offer: selectedOffer,
                    user_rating: rating,
                    catalog_item: selectedCatalogItem.name,
                    rating_after: rsp.rating,
                },
            });
        } catch (e) {
            notification.error({
                message: "Order Service",
                description: "Error at HandleOrderCompletion",
                duration: 2,
            });
        }
    };

    return (
        orderId && (
            <>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} xl={8}>
                        <Typography.Title level={4}>Order Details</Typography.Title>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <SelectedCatalogItemCard/>
                            </Col>
                            <Col span={24}>
                                <SelectedOfferCard/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Typography.Title level={4}>Live Tracking</Typography.Title>
                        <Card style={{width: "100%"}}>
                            <div style={{marginBottom: "1em"}}>
                                <Row justify="space-between" style={{fontSize: "1.35em"}}>
                                    <Col>
                                        <Typography.Text strong>Order ID</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text>
                                            #{orderId.substring(0, 8)}
                                        </Typography.Text>
                                    </Col>
                                </Row>
                            </div>
                            <Steps current={orderTrackingStep} direction="vertical">
                                {steps.map((item, i) => (
                                    <Step
                                        onStepClick={() => setOrderTrackingStep(i)}
                                        key={item.title}
                                        title={
                                            <div
                                                style={{
                                                    fontSize: "1.15em",
                                                    color:
                                                        orderTrackingStep === i
                                                            ? "black"
                                                            : "rgba(0, 0, 0, 0.45)",
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                        }
                                        description={
                                            orderTrackingStep === i && (
                                                <Row>
                                                    {orderDetails.slice(i * 2, i * 2 + 2).map((i) => (
                                                        <Col
                                                            span={24}
                                                            style={{fontSize: "1em"}}
                                                            className="trackingItem"
                                                        >
                                                            {i.detail}
                                                        </Col>
                                                    ))}
                                                </Row>
                                            )
                                        }
                                    />
                                ))}
                            </Steps>
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        {orderDetailsStreamCompleted && (
                            <>
                                <Typography.Title level={4}>Rate Our Partner</Typography.Title>
                                <Card style={{textAlign: "center"}}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Rate
                                                style={{
                                                    fontSize: "2.5em",
                                                    color: "rgb(246, 194, 67)",
                                                }}
                                                value={rating}
                                                onChange={(value) => setRating(value)}
                                                allowHalf
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <Button
                                                disabled={rating == 0}
                                                className={rating != 0 && "alva shake"}
                                                shape="round"
                                                onClick={async () => {
                                                    await handleOrderCompletion();
                                                    setRating(0);
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </>
                        )}
                    </Col>
                </Row>
                {modalInfo.open && (
                    <Modal
                        title={
                            <Row justify="center" align="middle">
                                <Col style={{fontSize: "1.3em", fontWeight: "400"}}>
                                    Flow Completed
                                </Col>
                            </Row>
                        }
                        footer={
                            <Button
                                className="alva shake"
                                shape="round"
                                onClick={() => setGlobalState({step: 0})}
                            >
                                OK
                            </Button>
                        }
                        onCancel={() => setGlobalState({step: 0})}
                        visible={modalInfo.open}
                        centered
                    >
                        <RatingResultCard content={modalInfo.content}/>
                    </Modal>
                )}
            </>
        )
    );
}

export default OrderService;
