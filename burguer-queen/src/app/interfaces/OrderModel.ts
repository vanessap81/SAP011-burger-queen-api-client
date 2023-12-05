import { Products } from "./Products"

export interface Ordermodel {
    userId: string,
    client: string,
    products: Products[],
    table: string
}