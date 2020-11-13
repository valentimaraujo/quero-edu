import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import University from '@src/models/University';

export default class CreateUniversities implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(University)().createMany(50);
  }
}
