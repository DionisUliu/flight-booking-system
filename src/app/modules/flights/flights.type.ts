export type FlightType = {
  flightNumber?: string;
  departureDate: string;
  arrivalDate: string;
  durationInHours: number;
  durationInMiles: number;
  departureAirport: string;
  arrivalAirport: string;
  totalAmountOfTickets: number;
  availableSeatNumbers: number[];
  airplane: string;
};

export type QueryType = {
  flightNumber?: string;
  fields?: string;
};

export type DbQueryType = {
  flightNumber?: { $regex: string; $options: string };
};
export type RequestParamsType = {
  requestParams: QueryType;
};
export type PostFlightType = {
  flightNumber?: string;
  departureDate: string;
  arrivalDate: string;
  durationInHours: number;
  durationInMiles: number;
  departureAirport: {
    name: string;
    code: string;
    city: string;
    state: string;
  };
  arrivalAirport: { name: string; code: string; city: string; state: string };
  totalAmountOfTickets: number;
  availableSeatNumbers: number[];
  airplane: string;
};
