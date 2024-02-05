import { User } from "./User";

export interface Device {
    id: string,
    type?: "arduino" | "raspberry",
    name?: string,
    user?: User,
    status?: "active" | "suspended"
}