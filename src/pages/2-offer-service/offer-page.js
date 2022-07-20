import React, {useContext, useEffect, useState} from "react";

import {Col, message, notification, Row, Typography} from "antd";
import OfferServiceCard from "./offer-card";
import {CatalogContext, StateContext} from "../../constant";

import SelectedCatalogItemCard from "../../components/selected-catalog-item-card";
import {OfferClient} from "../../grpc/offerpb/offer.client";

import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";

const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:8000"
});

const offer_client = new OfferClient(transport);

function OfferService() {
    const [selectedCatalogItem, _] = useContext(CatalogContext);

    const [offers, setOffers] = useState([]);

    useEffect(async () => {
        let data = [];

        try {
            let stream = offer_client.getOfferStream({
                flowId: globalState.flow_id, catalogId: selectedCatalogItem.id
            });

            for await (let response of stream.responses) {
                data.push(response);
                setOffers([...data]);
                message.info(`One New Offer, Total: ${data.length}`, 0.4);
            }

            notification.success({
                message: "Offer Service", description: "GetOfferStream completed", duration: 2,
            });
        } catch (e) {
            notification.error({
                message: "Offer Service", description: "Error at GetOfferStream", duration: 2,
            })
        }
    }, []);

    const [globalState, setGlobalState] = useContext(StateContext);

    return (<>
        <Row gutter={[16, 16]}>
            <Col xs={24} xl={8}>
                <Typography.Title level={4}>Selected Catalog Item</Typography.Title>
                <SelectedCatalogItemCard/>
            </Col>
            <Col xs={24} xl={16}>
                <Typography.Title level={4}>Live Offers</Typography.Title>
                <div style={{margin: "1.2em"}}>
                    <Row gutter={[8, 8]}>
                        {offers.map((i) => (<Col xs={24} xl={8} key={i.id}>
                            <OfferServiceCard item={i}/>
                        </Col>))}
                    </Row>
                </div>
            </Col>
        </Row>
    </>);
}

export default OfferService;
