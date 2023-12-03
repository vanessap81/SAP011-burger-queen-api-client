import { Products } from "./Products"

export interface UpdatedOrderResponse {
    updatedOrder: {
        _id: string,
        userId: string,
        client: string,
        products: Products[],
        status: string,
        createdAt: Date,
        updatedAt: Date,
        __v: number
    }
}