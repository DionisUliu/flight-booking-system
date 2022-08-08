import User from './users.model';
import { DbQueryType, QueryType } from './users.type';

export const getAllUsers = async (query: QueryType, projection: string[]) => {
  const dbQuery: DbQueryType = {};

  if (query.firstName) {
    dbQuery.firstName = {
      $regex: query.firstName,
      $options: 'i',
    };
  }
  const result = await User.find(dbQuery, projection);
  return result;
};

export const findOneUser = async ({ query, projection = {} }: any) => {
  const result = await User.findOne(query, projection);
  return result;
};

export const findUserToUpdate = async ({ query }: any) => {
  const dbQuery: any = {};

  if (query.equal) {
    Object.keys(query.equal).forEach((key) => {
      dbQuery[key] = {
        $eq: query.equal[key],
      };
    });
  }
  if (query.notEqual) {
    Object.keys(query.notEqual).forEach((key) => {
      dbQuery[key] = {
        $ne: query.notEqual[key],
      };
    });
  }

  const result = await User.findOne(dbQuery);
  return result;
};

export const updateUser = async ({ query, content }: any) => {
  // const options = { new: true };
  const result = await User.findOneAndUpdate(
    query,
    content
    // options,
  );
  return result;
};
