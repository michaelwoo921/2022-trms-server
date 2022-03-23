import userService from '../user/user.service';
import logger from '../log';

export function populateUsers() {
  logger.info('creating users data');
  userService.addUser({
    name: 'Michael',
    password: 'pass',
    role: 'Emp',
    supName: 'Richard',
    fund: 2000,
  });
  userService.addUser({
    name: 'Abigail',
    password: 'pass',
    role: 'Emp',
    supName: 'David',
    fund: 2000,
  });
  userService.addUser({
    name: 'Richard',
    password: 'pass',
    role: 'Sup',
    supName: 'Jim',
    fund: 2000,
  });
  userService.addUser({
    name: 'David',
    password: 'pass',
    role: 'Sup',
    supName: 'Jim',
    fund: 2000,
  });
  userService.addUser({
    name: 'Jim',
    password: 'pass',
    role: 'DeptHead',
    supName: 'Benco',
  });
  userService.addUser({
    name: 'Benco',
    password: 'pass',
    role: 'Benco',
    supName: 'King',
  });
  userService.addUser({
    name: 'King',
    password: 'pass',
    role: 'King',
  });
}

export function populateTrms() {
  console.log('need to create trms data');
}

export function deleteTableMessage(err: any, data: any) {
  if (err) {
    console.error(
      'Unable to delete table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Deleted table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
}

export function createTableMessage(err: any, data: any) {
  if (err) {
    console.error('Error', err);
  } else {
    console.log('Table created', data);
  }
}

export const UserTableName = 'trms-users';
export const TrmsTableName = 'trms-2022';
export const userSchema = {
  TableName: UserTableName,
  KeySchema: [{ AttributeName: 'name', KeyType: 'HASH' }],
  AttributeDefinitions: [
    {
      AttributeName: 'name',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 3,
    WriteCapacityUnits: 3,
  },
};

export const trmsSchema = {
  TableName: TrmsTableName,
  KeySchema: [
    { AttributeName: 'name', KeyType: 'HASH' },
    { AttributeName: 'createdDate', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'name',
      AttributeType: 'S',
    },
    {
      AttributeName: 'createdDate',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 3,
    WriteCapacityUnits: 3,
  },
};
export const removeUsers = { TableName: UserTableName };
export const removeTrms = { TableName: TrmsTableName };
export const waitInMilliSeconds = 10000;
