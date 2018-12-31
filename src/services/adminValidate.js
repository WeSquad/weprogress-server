import { UserInputError, ForbiddenError } from 'apollo-server-express';

const adminValidate = async (user) => {
  if (!user) {
    throw new UserInputError(`Please provide a valid token.`);
  }
  const role = user.role;

  if (!role || role !== 'admin') {
    throw new ForbiddenError(`Restricted area for your role.`);
  }

  return true;
};

export default adminValidate;
