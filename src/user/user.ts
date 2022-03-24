import userService from './user.service';
import logger from '../log';

export class User {
  constructor(
    public name: string,
    public password: string,
    public role?: Role,
    public supName?: string,
    public fund?: number
  ) {}
}

export async function login(
  name: string,
  password: string
): Promise<User | null> {
  if (name === '' || password === '') {
    return null;
  }
  return await userService.getUserByName(name).then((user) => {
    if (user && user.password === password) {
      logger.debug(user);
      return user;
    }
    return null;
  });
}

export async function register(u: User, callback: Function) {
  userService.addUser(u).then((resp) => {
    logger.trace(resp);
    callback();
  });
}

export async function updateUser(u: User) {
  userService.updateUserByName(u).then((resp) => {
    logger.trace(resp);
  });
}

export type Role = 'Emp' | 'Sup' | 'DeptHead' | 'Benco' | 'King';
