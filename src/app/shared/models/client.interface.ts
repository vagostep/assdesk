import { AuthoritiesDTO } from "./authorities.interface";

export interface ClientDTO {

    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: AuthoritiesDTO[];
    credentialsNonExpired: boolean;
    email: boolean;
    enabled: boolean;
    firstName: string;
    id: number;
    lastName: string;
    username: string;
}