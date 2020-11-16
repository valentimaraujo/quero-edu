import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '@src/models/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(1);
  }
}
