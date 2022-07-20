// @generated by protobuf-ts 2.7.0
// @generated from protobuf file "order.proto" (package "orderpb", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Order } from "./order";
import type { HandleOrderCompletionResponse } from "./order";
import type { HandleOrderCompletionRequest } from "./order";
import type { GetOrderDetailsResponse } from "./order";
import type { GetOrderDetailsRequest } from "./order";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { CreateOrderResponse } from "./order";
import type { CreateOrderRequest } from "./order";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service orderpb.Order
 */
export interface IOrderClient {
    /**
     * @generated from protobuf rpc: CreateOrder(orderpb.CreateOrderRequest) returns (orderpb.CreateOrderResponse);
     */
    createOrder(input: CreateOrderRequest, options?: RpcOptions): UnaryCall<CreateOrderRequest, CreateOrderResponse>;
    /**
     * @generated from protobuf rpc: GetOrderDetailStream(orderpb.GetOrderDetailsRequest) returns (stream orderpb.GetOrderDetailsResponse);
     */
    getOrderDetailStream(input: GetOrderDetailsRequest, options?: RpcOptions): ServerStreamingCall<GetOrderDetailsRequest, GetOrderDetailsResponse>;
    /**
     * @generated from protobuf rpc: HandleOrderCompletion(orderpb.HandleOrderCompletionRequest) returns (orderpb.HandleOrderCompletionResponse);
     */
    handleOrderCompletion(input: HandleOrderCompletionRequest, options?: RpcOptions): UnaryCall<HandleOrderCompletionRequest, HandleOrderCompletionResponse>;
}
/**
 * @generated from protobuf service orderpb.Order
 */
export class OrderClient implements IOrderClient, ServiceInfo {
    typeName = Order.typeName;
    methods = Order.methods;
    options = Order.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: CreateOrder(orderpb.CreateOrderRequest) returns (orderpb.CreateOrderResponse);
     */
    createOrder(input: CreateOrderRequest, options?: RpcOptions): UnaryCall<CreateOrderRequest, CreateOrderResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateOrderRequest, CreateOrderResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetOrderDetailStream(orderpb.GetOrderDetailsRequest) returns (stream orderpb.GetOrderDetailsResponse);
     */
    getOrderDetailStream(input: GetOrderDetailsRequest, options?: RpcOptions): ServerStreamingCall<GetOrderDetailsRequest, GetOrderDetailsResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetOrderDetailsRequest, GetOrderDetailsResponse>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: HandleOrderCompletion(orderpb.HandleOrderCompletionRequest) returns (orderpb.HandleOrderCompletionResponse);
     */
    handleOrderCompletion(input: HandleOrderCompletionRequest, options?: RpcOptions): UnaryCall<HandleOrderCompletionRequest, HandleOrderCompletionResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<HandleOrderCompletionRequest, HandleOrderCompletionResponse>("unary", this._transport, method, opt, input);
    }
}
