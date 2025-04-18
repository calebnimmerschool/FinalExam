export interface Entertainer {
    entertainerID: number;
    entStageName: string;
    entSSN: string;
    entStreetAddress: string;
    entCity: string;
    entState: string;
    entZipCode: string;
    entPhoneNumber: string;
    entEmailAddress: string;
    entWebPage: string;
    dateEntered: string;
    bookingCount?: number;
    lastBookingDate?: string;
}

export interface EntertainerInput {
    entStageName: string;
    entSSN: string;
    entStreetAddress: string;
    entCity: string;
    entState: string;
    entZipCode: string;
    entPhoneNumber: string;
    entEmailAddress: string;
    entWebPage: string;
    dateEntered: string;
}
