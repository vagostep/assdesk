import { Customer } from "./customer.interface";
import { Asset } from "./asset.interface";

export interface User {

    customer: Customer;
    assets: Asset[]
}
