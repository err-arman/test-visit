import { Location } from "./Location";
import { Visit } from "./Visit";

export type Provider = {
    id: number;
    created_at: Date;
    updated_at: Date;
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    password: string;
    speciality: string;
    accepted_patients: string;
    services: string[];
    locations: Location[];
    visits: Visit[];
}