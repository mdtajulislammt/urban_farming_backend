export type IRentalSpacePayload = {
    location: string;
    size: string;
    price: number;
};

export type IBookingPayload = {
    rental_space_id: string;
    start_date: string;
    end_date: string;
};