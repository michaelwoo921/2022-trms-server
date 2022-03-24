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
    return await this.doc
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
  async getAllUsers(): Promise<User[]> {
    const params = { TableName };
    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        logger.info(data);
        return data.Items as User[];
      })
      .catch((err) => {
        logger.error(err);
        return [] as User[];
      });
  }

  async getUserByName(name: string): Promise<User | null> {
    const params = { TableName, Key: { name } };
    return await this.doc
      .get(params)
      .promise()
      .then((data) => {
        logger.info(data);
        return data.Item as User;
      })
      .catch((err) => {
        logger.error(err);
        return null;
      });
  }

  async updateUserByName(u: User) {
    logger.debug(u);
    const params = {
      TableName,
      Key: { name: u.name },
      ConditionExpression: '#name=:name',
      UpdateExpression: 'set #password =:p, #fund =:f, #role =:r, #supName =:s',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#password': 'password',
        '#role': 'role',
        '#supName': 'supName',
        '#fund': 'fund',
      },
      ExpressionAttributeValues: {
        ':name': u.name,
        ':p': u.password,
        ':r': u.role,
        ':s': u.supName,
        ':f': u.fund,
      },
      ReturnValues: 'UPDATED_NEW',
    };
    return await this.doc
      .update(params)
      .promise()
      .then((data) => {
        logger.info(data);
        return true;
      })
      .catch((err) => {
        logger.error(err);
        return false;
      });
  }
}

const userService = new UserService();

export default userService;
