import { testRequest, apiPrefix } from './util/jest-setup';
import { Kind, Level, Shift } from '@src/models/Course';
import Helpers from './util/helpers';
import { getConnection } from 'typeorm';
import Offer from '@src/models/Offer';
import User from '@src/models/User';

describe('OFFER TEST', () => {
  let offerObj = Helpers.getOfferObj();
  let authorization: User;
  let bearer = {};

  beforeEach(async () => {
    offerObj = Helpers.getOfferObj();

    const user = {
      email: 'test@mail.com',
      password: 'secret',
    };
    authorization = await Helpers.getValidToken(user);
    bearer = { 'Authorization': `Bearer ${authorization}` };
  });

  describe('OFFER TEST FILTERS', () => {
    it('should return a list of offers', async () => {
      const { status, body } = await testRequest.get(`${apiPrefix}/offers`)
        .set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers filtered by course name', async () => {
      const str = 'Best Course in the World';
      const subStr = str.substring(0, 10);

      offerObj.course.name = expect.stringContaining(subStr);
      const course = {
        name: str,
      };
      const { id } = await Helpers.createCourse(course);

      const offer = {
        course: id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?course=${subStr}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers filtered by university', async () => {
      const str = 'Best University in the World';
      const subStr = str.substring(0, 10);

      offerObj.university.name = expect.stringContaining(subStr);
      const university = {
        name: str,
      };
      const { id } = await Helpers.createUniversity(university);

      const offer = {
        university: id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?university=${subStr}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers filtered by kind', async () => {
      offerObj.course.kind = Kind.PRESENTIAL;
      const course = {
        kind: Kind.PRESENTIAL,
      };
      const { id } = await Helpers.createCourse(course);

      const offer = {
        course: id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?kind=${offerObj.course.kind}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers filtered by level', async () => {
      offerObj.course.level = Level.BACHELOR_DEGREE;
      const course = {
        level: Level.BACHELOR_DEGREE,
      };
      const { id } = await Helpers.createCourse(course);

      const offer = {
        course: id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?level=${offerObj.course.level}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers filtered by shift', async () => {
      offerObj.course.shift = Shift.EVENING;
      const course = {
        shift: Shift.EVENING,
      };
      const { id } = await Helpers.createCourse(course);

      const offer = {
        course: id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?shift=${offerObj.course.shift}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers filtered by city', async () => {
      const str = 'Best City in the World';
      const subStr = str.substring(0, 10);

      offerObj.campus.city = expect.stringContaining(subStr);
      const campus = {
        city: str,
      };
      const { id } = await Helpers.createCampus(campus);

      const offer = {
        campus: id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?city=${subStr}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers using all filters', async () => {
      const strCourse = 'Best Course in the World';
      const subStrCourse = strCourse.substring(0, 10);
      offerObj.course.kind = Kind.PRESENTIAL;
      offerObj.course.level = Level.GRADUATION;
      offerObj.course.shift = Shift.EVENING;
      offerObj.course.name = expect.stringContaining(subStrCourse);
      const course = {
        name: strCourse,
        kind: Kind.PRESENTIAL,
        level: Level.GRADUATION,
        shift: Shift.EVENING,
      };
      const { id: course_id } = await Helpers.createCourse(course);

      const strCampus = 'Best City in the World';
      const subStrCampus = strCampus.substring(0, 10);
      offerObj.campus.city = expect.stringContaining(subStrCampus);
      const campus = {
        city: strCampus,
      };
      const { id: campus_id } = await Helpers.createCampus(campus);

      const strUniversity = 'Best University in the World';
      const subStrUniversity = strUniversity.substring(0, 10);
      offerObj.university.name = expect.stringContaining(subStrUniversity);
      const university = {
        name: strUniversity,
      };
      const { id: university_id } = await Helpers.createUniversity(university);

      const offer = {
        campus: campus_id,
        university: university_id,
        course: course_id,
      };
      await Helpers.createOffer(offer);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/offers?course=${subStrCourse}` +
          `&kind=${offerObj.course.kind}` +
          `&level=${offerObj.course.level}` +
          `&shift=${offerObj.course.shift}` +
          `&university=${subStrUniversity}` +
          `&city=${subStrCampus}`
      ).set(bearer);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(offerObj));
    });

    it('should return a list of offers using orderByValue', async () => {
      const orderBy = [
        { order: 'desc', alias: 'max' },
        { order: 'asc', alias: 'min' },
      ];

      orderBy.map(async (v) => {
        const num = await getConnection()
          .createQueryBuilder()
          .select(`${v.alias.toUpperCase()}(price_with_discount)`, v.alias)
          .from(Offer, 'offers')
          .getRawOne();

        let res = await testRequest.get(
          `${apiPrefix}/offers?orderByValue=${v.order}`
        ).set(bearer);
        expect(res.body[0].price_with_discount).toEqual(num[v.alias]);
      });
    });

    it('should return a exception for invalid called(SQL INJECTION)', async () => {
      const sqlInjection = ["'1=1'", "admin'--", "' OR (1=1)" /* ...more */];

      sqlInjection.map(async (v) => {
        let res = await testRequest.get(`${apiPrefix}/offers?shift=${v}`).set(bearer);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal server error' });
      });
    });
  });
});
