import * as validator from './users.validator';
import * as dal from './users.dal';
import { NotFound, UnprocessableEntity } from '../../utils/error';
import errorDetailsConstants from '../../constants/errorDetailsConstants';
import {
  GetProfileType,
  QueryType,
  RequestParamsType,
  UpdateProfileType,
} from './users.type';

export const getAllUsers = async ({ requestParams }: RequestParamsType) => {
  validator.validateGetAllUsersRequest({ input: requestParams });

  const projection = requestParams?.fields
    ? requestParams.fields.split(',')
    : ['firstName', 'lastName', 'email', 'isAdmin'];

  const query: QueryType = {};
  if (requestParams?.firstName) {
    query.firstName = requestParams.firstName;
  }

  const users = await dal.getAllUsers(query, projection);

  return users;
};

export const getProfile = async ({ userId }: GetProfileType) => {
  const requestParams = { id: userId };
  validator.validateGetProfileRequest({ input: requestParams });

  const query = { _id: userId };
  const projection = ['firstName', 'lastName', 'email', 'phoneNumber'];

  const userFromDB = await dal.findOneUser({ query, projection });

  if (!userFromDB) {
    throw new NotFound(errorDetailsConstants.USER_NOT_FOUND);
  }

  return userFromDB;
};

export const updateProfile = async ({
  userId,
  requestBody,
}: UpdateProfileType) => {
  validator.validateUpdateProfileRequest({ input: requestBody });

  const query = { _id: userId };
  const userFromDB = await dal.findOneUser({ query });

  if (!userFromDB) {
    throw new NotFound(errorDetailsConstants.USER_NOT_FOUND);
  }

  if (requestBody.firstName || requestBody.lastName) {
    const newFirstName = requestBody.firstName;
    const newLastName = requestBody.lastName;
    const existingUser = await dal.findUserToUpdate({
      query: {
        equal: {
          firstName: newFirstName,
          lastName: newLastName,
        },
        notEqual: {
          _id: userFromDB._id,
        },
      },
    });

    if (existingUser) {
      throw new UnprocessableEntity(errorDetailsConstants.USER_EXIST);
    }
  }

  await dal.updateUser({
    query: { _id: userId },
    content: requestBody,
  });
};
