import { ClientDTO } from "app/shared/models/client.interface";

export interface SignupDTO {

    token: string;
    type: string;
    appClientDetails: ClientDTO;
}