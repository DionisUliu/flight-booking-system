export type AirportType = {
  name: string;
  code?: string;
  city: string;
  state: string;
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
export interface IAirport {
  name: string;
  code?: string;
  city: string;
  state: string;
}
