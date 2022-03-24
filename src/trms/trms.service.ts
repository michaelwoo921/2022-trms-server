import docClient from '../dynamo/dynamo';
import { Trms } from './trms';
import logger from '../log';

export const TableName = 'trms-2022';

class TrmsService {
  private doc;
  constructor() {
    this.doc = docClient;
  }

  async addTrms(t: Trms): Promise<boolean> {
    const datayorb = JSON.parse(JSON.stringify(t));

    const params = {
      TableName,
      Item: datayorb,
      ConditionExpression: '#name <> :name AND #d <> :createdDate',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#d': 'createdDate',
      },
      ExpressionAttributeValues: {
        ':name': datayorb.name,
        ':createdDate': datayorb.createdDate,
      },
    };
    return await this.doc
      .put(params)
      .promise()
      .then((result) => {
        logger.info('successfully created trms item');
        return true;
      })
      .catch((err) => {
        logger.error(err);
        return false;
      });
  }
  async getAllTrms(): Promise<Trms[]> {
    const params = { TableName };

    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        logger.info(data);
        return data.Items as Trms[];
      })
      .catch((err) => {
        logger.error(err);
        return [];
      });
  }
  async getTrms(name: string, createdDate: string): Promise<Trms | null> {
    const params = {
      TableName,
      Key: {
        name,
        createdDate,
      },
    };

    return this.doc
      .get(params)
      .promise()
      .then((data) => {
        logger.info(data);
        return data.Item as Trms;
      })
      .catch((err) => {
        logger.error(err);
        return null;
      });
  }

  async deleteTrms(name: string, createdDate: string): Promise<boolean> {
    const params = {
      TableName,
      Key: {
        name,
        createdDate,
      },
    };

    return this.doc
      .delete(params)
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

  async updateTrms(t: Trms): Promise<boolean> {
    logger.info(t);
    const { name, createdDate } = t;
    const params = {
      TableName,
      Key: {
        name,
        createdDate,
      },
      ConditionExpression: '#name = :name AND #createdDate = :createdDate',
      UpdateExpression:
        'set #approval = :ap, #proReimbursement =:p, #attachments =:at, #comments =:co, #grade =:gr',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#createdDate': 'createdDate',
        '#approval': 'approval',
        '#proReimbursement': 'proReimbursement',
        '#attachments': 'attachments',
        '#comments': 'comments',
        '#grade': 'grade',
      },
      ExpressionAttributeValues: {
        ':name': t.name,
        ':createdDate': t.createdDate,
        ':ap': t.approval,
        ':p': t.proReimbursement,
        ':at': t.attachments,
        ':co': t.comments,
        ':gr': t.grade,
      },
      ReturnValue: 'UPDATED_NEW',
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info('successfully updated trms');
        return true;
      })
      .catch((err) => {
        logger.error(err);
        return false;
      });
  }
}

const trmsService = new TrmsService();

export default trmsService;
