export type TicketType = {
  seatNumber: number;
  confirmationNumber: string;
  user: string;
  price: number;
  class: string;
  flight: string;
};

export type QueryType = {
  name?: string;
  fields?: string;
};

export type DbQueryType = {
  name?: { $regex: string; $options: string };
};
export type RequestParamsType = {
  requestParams: QueryType;
};
