import userService from '../user/user.service';
import trmsService from '../trms/trms.service';
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
  console.log('creating trms data');
  trmsService.addTrms({
    name: 'Michael',
    supName: 'Richard',
    createdDate: '2020-08-25',
    role: 'Emp',
    eventName: 'Nodejs with TypeScript',
    eventDescription: 'backend development',
    eventStartDate: '2021-01-12',
    eventEndDate: '2021-02-01',
    eventLocation: 'Los Angeles',
    eventType: 'Certification Preparation Classes',
    eventCost: 100,
    proReimbursement: 80,
    justification: 'needed for job skill',
    eventGradingFormat: '',
    grade: '',
    comments: '',
    approval: {
      sup: { date: '', reason: '', status: '', additionalInfo: '' },
      head: { date: '', reason: '', status: '', additionalInfo: '' },
      benco: { date: '', reason: '', status: '', additionalInfo: '' },
    },
    attachments: '',
  });

  trmsService.addTrms({
    name: 'Michael',
    createdDate: '2021-01-10',
    role: 'Emp',
    eventStartDate: '2021-02-20',
    eventEndDate: '2021-04-15',
    eventLocation: 'online',
    supName: 'Richard',
    eventDescription: 'Native App for android and IOS',
    eventName: 'React Native with Redux',
    eventCost: 500,
    eventType: 'Certification Preparation Classes',
    proReimbursement: 375,
    justification:
      'requires a good understanding of noSql DB to serve customers with better app experience',
    attachments: '',
    eventGradingFormat: '',
    grade: '',
    comments: '',
    approval: {
      sup: { date: '', reason: '', status: '', additionalInfo: '' },
      head: { date: '', reason: '', status: '', additionalInfo: '' },
      benco: { date: '', reason: '', status: '', additionalInfo: '' },
    },
  });

  trmsService.addTrms({
    name: 'Elisa',
    createdDate: '2021-01-10',
    role: 'Emp',
    eventStartDate: '2021-05-12',
    eventEndDate: '2021-06-13',
    eventLocation: '',
    supName: 'David',
    eventName: 'Postgres',
    eventDescription: '',
    eventCost: 500,
    eventGradingFormat: '',
    eventType: 'University Courses',
    justification: '',
    attachments: '',
    grade: '',
    comments: '',

    proReimbursement: 300,
    approval: {
      sup: { date: '', reason: '', status: '', additionalInfo: '' },
      head: { date: '', reason: '', status: '', additionalInfo: '' },
      benco: { date: '', reason: '', status: '', additionalInfo: '' },
    },
  });

  trmsService.addTrms({
    name: 'Richard',
    createdDate: '2021-01-10',
    role: 'Sup',
    eventStartDate: '2021-05-12',
    eventEndDate: '2021-05-12',
    eventLocation: '',
    supName: 'Jim',
    eventName: 'Augular',
    eventDescription: '',
    eventCost: 500,
    proReimbursement: 400,
    eventGradingFormat: '',
    eventType: 'Certification',
    justification: '',
    attachments: '',
    grade: '',
    comments: '',

    approval: {
      sup: { date: '', reason: '', status: '', additionalInfo: '' },
      head: { date: '', reason: '', status: '', additionalInfo: '' },
      benco: { date: '', reason: '', status: '', additionalInfo: '' },
    },
  });
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
