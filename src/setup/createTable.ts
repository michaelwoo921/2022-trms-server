import AWS from 'aws-sdk';
import {
  populateTrms,
  populateUsers,
  deleteTableMessage,
  createTableMessage,
  removeUsers,
  userSchema,
  removeTrms,
  trmsSchema,
  waitInMilliSeconds,
} from './helper';

AWS.config.update({
  region: 'us-west-2',
});

const dynamodb = new AWS.DynamoDB();

dynamodb.deleteTable(removeUsers, function (err, data) {
  deleteTableMessage(err, data);
  setTimeout(() => {
    dynamodb.createTable(userSchema, function (err, data) {
      createTableMessage(err, data);
      setTimeout(() => {
        populateUsers();
      }, waitInMilliSeconds);
    });
  }, waitInMilliSeconds);
});

dynamodb.deleteTable(removeTrms, function (err, data) {
  deleteTableMessage(err, data);
  setTimeout(() => {
    dynamodb.createTable(trmsSchema, function (err, data) {
      createTableMessage(err, data);
      setTimeout(() => {
        populateTrms();
      }, waitInMilliSeconds);
    });
  }, waitInMilliSeconds);
});
