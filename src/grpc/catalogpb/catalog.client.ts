// @generated by protobuf-ts 2.7.0
// @generated from protobuf file "catalog.proto" (package "catalogpb", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Catalog } from "./catalog";
import type { UpdateItemResponse } from "./catalog";
import type { UpdateItemRequest } from "./catalog";
import type { GetItemsResponse } from "./catalog";
import type { GetItemsRequest } from "./catalog";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { GetItemResponse } from "./catalog";
import type { GetItemRequest } from "./catalog";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service catalogpb.Catalog
 */
export interface ICatalogClient {
    /**
     * @generated from protobuf rpc: GetItem(catalogpb.GetItemRequest) returns (catalogpb.GetItemResponse);
     */
    getItem(input: GetItemRequest, options?: RpcOptions): UnaryCall<GetItemRequest, GetItemResponse>;
    /**
     * @generated from protobuf rpc: GetItems(catalogpb.GetItemsRequest) returns (catalogpb.GetItemsResponse);
     */
    getItems(input: GetItemsRequest, options?: RpcOptions): UnaryCall<GetItemsRequest, GetItemsResponse>;
    /**
     * @generated from protobuf rpc: UpdateItem(catalogpb.UpdateItemRequest) returns (catalogpb.UpdateItemResponse);
     */
    updateItem(input: UpdateItemRequest, options?: RpcOptions): UnaryCall<UpdateItemRequest, UpdateItemResponse>;
}
/**
 * @generated from protobuf service catalogpb.Catalog
 */
export class CatalogClient implements ICatalogClient, ServiceInfo {
    typeName = Catalog.typeName;
    methods = Catalog.methods;
    options = Catalog.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: GetItem(catalogpb.GetItemRequest) returns (catalogpb.GetItemResponse);
     */
    getItem(input: GetItemRequest, options?: RpcOptions): UnaryCall<GetItemRequest, GetItemResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetItemRequest, GetItemResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetItems(catalogpb.GetItemsRequest) returns (catalogpb.GetItemsResponse);
     */
    getItems(input: GetItemsRequest, options?: RpcOptions): UnaryCall<GetItemsRequest, GetItemsResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetItemsRequest, GetItemsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateItem(catalogpb.UpdateItemRequest) returns (catalogpb.UpdateItemResponse);
     */
    updateItem(input: UpdateItemRequest, options?: RpcOptions): UnaryCall<UpdateItemRequest, UpdateItemResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateItemRequest, UpdateItemResponse>("unary", this._transport, method, opt, input);
    }
}
