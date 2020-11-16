import { SetupServer } from '@src/server';
import supertest from 'supertest';
import {
  factory,
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from 'typeorm-seeding';
import User from '@src/models/User';
import Campus from '@src/models/Campus';
import Course from '@src/models/Course';
import University from '@src/models/University';
import Offer from '@src/models/Offer';
import { createTypeormConn } from '@src/database/connection';

let server: SetupServer;
export let apiPrefix = '/api/v1';
export let testRequest: any;

beforeAll(async () => {
  server = new SetupServer();

  await server.initTest();
  testRequest = supertest(server.getApp());

  await useRefreshDatabase({ connection: 'test' });
  await useSeeding();

  await factory(User)().createMany(1);
  await factory(Campus)().createMany(10);
  await factory(University)().createMany(10);
  await factory(Course)().createMany(10);
  await factory(Offer)().createMany(5);

  await createTypeormConn();
});

afterAll(async () => {
  await server.close();
  tearDownDatabase();
});
