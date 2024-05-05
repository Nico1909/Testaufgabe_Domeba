import { User } from "./user.model";

export interface Business {
    Name: string;
    IndustryType: string;
    Users: User[];
}