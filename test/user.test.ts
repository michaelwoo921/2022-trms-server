import { User } from '../src/user/user';

it('new user object', () => {
  const user = new User('Michael', 'pass');

  expect(user).toEqual({
    name: 'Michael',
    password: 'pass',
    role: undefined,
    supName: undefined,
    fund: undefined,
  });
});
