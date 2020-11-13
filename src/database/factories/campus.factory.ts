import Campus from '@src/models/Campus';
import Faker from 'faker';
import { define } from 'typeorm-seeding';

define(Campus, (faker: typeof Faker) => {
  faker.locale = 'pt_BR';
  const campus = new Campus();
  campus.name = faker.address.city();
  campus.city = faker.address.city();
  return campus;
});
