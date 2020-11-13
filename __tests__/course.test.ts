import { testRequest, apiPrefix } from './util/jest-setup';
import { Kind, Level, Shift } from '@src/models/Course';
import Helpers from './util/helpers';

describe('COURSE TEST', () => {
  let courseObj = Helpers.getCourseObj();

  beforeEach(async () => {
    courseObj = Helpers.getCourseObj();
  });

  describe('COURSE TEST FILTERS', () => {
    it('should return a list of courses', async () => {
      const { status, body } = await testRequest.get(`${apiPrefix}/courses`);
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(courseObj));
    });

    it('should return a list of courses filtered by university', async () => {
      const str = 'Best University in the World';
      const subStr = str.substring(0, 10);

      courseObj.course.university.name = expect.stringContaining(subStr);
      const university = {
        name: str,
      };
      const { id } = await Helpers.createUniversity(university);

      const course = {
        university: id,
      };
      await Helpers.createCourse(course);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/courses?university=${subStr}`
      );
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(courseObj));
    });

    it('should return a list of courses filtered by kind', async () => {
      courseObj.course.kind = Kind.PRESENTIAL;
      const course = {
        kind: Kind.PRESENTIAL,
      };

      await Helpers.createCourse(course);
      const { status, body } = await testRequest.get(
        `${apiPrefix}/courses?kind=${courseObj.course.kind}`
      );
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(courseObj));
    });

    it('should return a list of courses filtered by level', async () => {
      courseObj.course.level = Level.BACHELOR_DEGREE;
      const course = {
        level: Level.BACHELOR_DEGREE,
      };

      await Helpers.createCourse(course);
      const { status, body } = await testRequest.get(
        `${apiPrefix}/courses?level=${courseObj.course.level}`
      );
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(courseObj));
    });

    it('should return a list of courses filtered by shift', async () => {
      courseObj.course.shift = Shift.EVENING;
      const course = {
        shift: Shift.EVENING,
      };

      await Helpers.createCourse(course);
      const { status, body } = await testRequest.get(
        `${apiPrefix}/courses?shift=${courseObj.course.shift}`
      );
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(courseObj));
    });

    it('should return a list of courses using all filters', async () => {
      const strCampus = 'Best City in the World';
      const subStrCampus = strCampus.substring(0, 10);
      courseObj.course.campus.city = expect.stringContaining(subStrCampus);
      const campus = {
        city: strCampus,
      };
      const { id: campus_id } = await Helpers.createCampus(campus);

      const strUniversity = 'Best University in the World';
      const subStrUniversity = strUniversity.substring(0, 10);
      courseObj.course.university.name = expect.stringContaining(subStrUniversity);
      const university = {
        name: strUniversity,
      };
      const { id: university_id } = await Helpers.createUniversity(university);

      const strCourse = 'Best Course in the World';
      const subStrCourse = strCourse.substring(0, 10);
      courseObj.course.kind = Kind.PRESENTIAL;
      courseObj.course.level = Level.GRADUATION;
      courseObj.course.shift = Shift.EVENING;
      courseObj.course.name = expect.stringContaining(subStrCourse);
      const course = {
        university: university_id,
        campus: campus_id,
        name: strCourse,
        kind: Kind.PRESENTIAL,
        level: Level.GRADUATION,
        shift: Shift.EVENING,
      };
      await Helpers.createCourse(course);

      const { status, body } = await testRequest.get(
        `${apiPrefix}/courses?kind=${courseObj.course.kind}` +
        `&level=${Level.GRADUATION}` +
        `&shift=${Shift.EVENING}` +
        `&university=${subStrUniversity}` +
        `&city=${subStrCampus}`,
      );
      expect(status).toBe(200);
      expect(body[0]).toEqual(expect.objectContaining(courseObj));
    });

    it('should return a exception for invalid called(SQL INJECTION)', async () => {
      const sqlInjection = ["'1=1'", "admin'--", "' OR (1=1)" /* ...more */];

      sqlInjection.map(async (v) => {
        let res = await testRequest.get(`${apiPrefix}/courses?shift=${v}`);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal server error' });
      });
    });
  });
});
