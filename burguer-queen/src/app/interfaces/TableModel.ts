import { Products } from "./Products"
export interface TableModel {
    table: string,
    userId: string,
    _id: string, 
    client: string,
    status: string,
    products: Products[];
    updatedAt: string
}