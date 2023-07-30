import { Provider } from "./Provider";
import { Visit } from "./Visit";

export type Location = {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    opens_at: string;
    closes_at: string;
    address: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    speciality?: string;
    accepted_patients?: string;
    services: string[];
    provider: Provider;
    visits: Visit[];
}