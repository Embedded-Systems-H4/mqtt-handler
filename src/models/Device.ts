export interface Device {
    type: "arduino" | "raspberry" | "door",
    name: string,
    id: string
}