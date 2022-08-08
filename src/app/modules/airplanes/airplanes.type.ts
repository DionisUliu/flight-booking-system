export type AirplaneType = {
  name: string;
  seats: number;
  fuelCapacity: number;
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
