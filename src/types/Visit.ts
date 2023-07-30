import { Location } from "./Location";
import { Provider } from "./Provider";

export enum VisitTime {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    EVENING = 'evening',
}

export enum VisitStatus {
    PENDING = 'pending',
    RESERVED = 'reserved',
    HERE = 'here',
    READY = 'ready',
    IN_EXAM_ROOM = 'in_exam_room',
    PATIENTS_ONSITE = 'patients_onsite',
    DISCHARGED = 'discharged',
    CANCELLED = 'cancelled',
    NO_SHOW = 'no_show',
}

export type Visit = {
    id: number;
    created_at: Date;
    updated_at: Date;
    visit_date: Date;
    visit_time: VisitTime;
    patient_name?: string;
    patient_email: string;
    patient_phone: string;
    patient_date_of_birth: string;
    patient_sex: string;
    reason_for_visit: string;
    notes?: string;
    status: VisitStatus;
    location: Location;
    provider: Provider;
    user: any;
}