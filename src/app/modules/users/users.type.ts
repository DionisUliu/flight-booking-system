export type UserType = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isAdmin?: boolean;
  confirmationLevel?: string;
  confirmationToken?: string;
  twoFactorAuth?: {
    active: boolean;
    secret: {
      ascii: string;
      hex: string;
      base32: string;
      otpauth_url: string;
    };
  };
};

export type QueryType = {
  firstName?: string;
  fields?: string;
};

export type DbQueryType = {
  firstName?: { $regex: string; $options: string };
};
export type RequestParamsType = {
  requestParams: QueryType;
};
export type GetProfileType = {
  userId: string;
};
export type UpdateProfileType = {
  userId: string;
  requestBody: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
};
