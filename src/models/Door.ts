import { Device } from "./Device"

export interface Door extends Device {
    allowedRoles?: string[]
    locked?: boolean
}