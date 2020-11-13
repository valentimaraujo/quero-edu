import University from '@src/models/University';
import Faker from 'faker';
import { define } from 'typeorm-seeding';

define(University, (faker: typeof Faker) => {
  faker.locale = 'pt_BR';
  const university = new University();
  university.name = faker.name.jobTitle();
  university.score = Number((Math.random() * (5 - 3) + 3).toFixed(2));
  university.logo_url = faker.image.business(80, 80);
  return university;
});
