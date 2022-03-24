import userService from '../src/user/user.service';
import { User } from '../src/user/user';
import dynamo from '../src/dynamo/dynamo';

dynamo.put = jest.fn();
describe('userService', () => {});
