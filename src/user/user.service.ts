import docClient from '../dynamo/dynamo';
import { User } from './user';
import logger from '../log';

const TableName = 'trms-users';

class UserService {
  private doc;
  constructor() {
    this.doc = docClient;
  }

  async addUser(u: User): Promise<boolean> {
    const params = {
      TableName,
      Item: u,
      ConditionExpression: '#name <> :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': u.name,
      },
    };
    return this.doc
      .put(params)
      .promise()
      .then((result) => {
        logger.info('successfully created user item');
        return true;
      })
      .catch((err) => {
        logger.error(err);
        return false;
      });
  }
  getUsers() {}

  getUserByName() {}
  updateUser() {}
}

const userService = new UserService();

export default userService;
