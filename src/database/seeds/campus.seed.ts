import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Campus from '@src/models/Campus';

export default class CreateCampus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Campus)().createMany(50);
  }
}
