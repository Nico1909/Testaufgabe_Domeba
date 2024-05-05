import { Business } from "./business.model";
import { User } from "./user.model";

export interface BusinessAndUser {
    Business: Business;
    User: User;
}