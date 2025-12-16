export class CreateBookingDto {
    origin: {
        location: {
            lat: number;
            lng: number;
        };
        address: string;
    };

    destination: {
        location: {
            lat: number;
            lng: number;
        };
        address: string;
    };

    distance: {
        text: string;
        value: number;
    };

    duration: {
        text: string;
        value: number;
    };

    route: {
        summary: string;
        polyline: string;
        waypoints: any[];
        bounds: {
            northeast: { lat: number; lng: number };
            southwest: { lat: number; lng: number };
        };
    };

    price: {
        minimumFare: number;
        bookingFee: number;
        total: number;
    };

    vehiclePreference?: string;

    userInfo: {
        date: string;
        time: string;
        name: string;
        scheduledDateTime: string;
        phone: string;
    };

    paymentMethod: string;
}
