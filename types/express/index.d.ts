declare namespace Express {
  interface Request {
    user?: {
      _id: string;
      confirmationLevel: number;
      isAdmin: boolean;
    };
  }
}
