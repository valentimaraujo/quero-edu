import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Course from '@src/models/Course';

export default class CreateCourses implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Course)().createMany(100);
  }
}
