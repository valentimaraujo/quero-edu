import User from '@src/models/User';
import Faker from 'faker';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  faker.locale = 'pt_BR';
  const user = new User();
  user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  user.email = 'faker@user.com';
  user.password = 'secret';
  return user;
});
