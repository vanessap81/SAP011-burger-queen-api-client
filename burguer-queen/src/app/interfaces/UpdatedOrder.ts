import { Ordermodel } from "./OrderModel";

export interface UpdatedOrder extends Ordermodel {
    status: string
}