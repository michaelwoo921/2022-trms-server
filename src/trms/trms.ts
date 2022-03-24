import { Role } from '../user/user';

export class Trms {
  name = '';
  supName = '';
  role: Role | undefined = undefined;
  createdDate = '';
  eventName = '';
  eventType = '';
  eventStartDate = '';
  eventEndDate = '';
  eventLocation = '';
  eventDescription = '';
  eventCost = 0;
  proReimbursement = 0;
  eventGradingFormat = '';
  grade = '';
  justification = '';
  attachments = '';
  approval = {
    sup: { status: '', date: '', reason: '', additionalInfo: '' },
    head: { status: '', date: '', reason: '', additionalInfo: '' },
    benco: { status: '', date: '', reason: '', additionalInfo: '' },
  };
  comments = '';

  constructor(name: string, date: string) {
    this.name = name;
    this.createdDate = date;
  }
}
