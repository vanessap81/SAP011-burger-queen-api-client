import { ProductsInOrder } from "./ProdutcsInOrder"
export interface OrderResponse {
    _id: string,
    userId: string,
    client: string,
    products: ProductsInOrder[],
    status: string,
    createdAt: string,
    updatedAt: string,
    table: string
    __v: number
}