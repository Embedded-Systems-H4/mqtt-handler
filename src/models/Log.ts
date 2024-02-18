
export interface Log {
    type: "device_register" | "device_access_update"
    profileId?: number
    deviceId?: number
    cardId?: number
    access?: "denied" | "approved"
    timestamp: Date
}