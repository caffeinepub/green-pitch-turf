import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookerDetails {
    name: string;
    phone: string;
}
export type Time = bigint;
export type SlotId = string;
export interface BookingSlot {
    id: SlotId;
    startTime: Time;
    status: SlotStatus;
    endTime: Time;
    date: Time;
    bookerDetails?: BookerDetails;
}
export enum SlotStatus {
    booked = "booked",
    available = "available"
}
export interface backendInterface {
    addSlot(date: Time, startTime: Time, endTime: Time): Promise<SlotId>;
    bookSlot(slotId: SlotId, name: string, phone: string): Promise<void>;
    cancelBooking(slotId: SlotId): Promise<void>;
    deleteSlot(slotId: SlotId): Promise<void>;
    getAllSlots(): Promise<Array<BookingSlot>>;
    getAvailableSlots(): Promise<Array<BookingSlot>>;
}
