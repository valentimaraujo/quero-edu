import Course, { Kind, Level, Shift } from '@src/models/Course';
import Faker from 'faker';
import { define } from 'typeorm-seeding';

define(Course, (faker: typeof Faker) => {
  faker.locale = 'pt_BR';
  const course = new Course();
  course.name = faker.name.jobTitle();
  // @ts-ignore
  course.university = faker.random.number({ min: 1, max: 10 });
  // @ts-ignore
  course.campus = faker.random.number({ min: 1, max: 10 });
  course.kind = randomEnum(Kind);
  course.level = randomEnum(Level);
  course.shift = randomEnum(Shift);
  return course;
});

function randomEnum(obj: any) {
  const rand = Math.floor(Math.random() * Object.keys(obj).length);
  return obj[Object.keys(obj)[rand]];
}
