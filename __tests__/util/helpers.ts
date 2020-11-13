// @ts-nocheck
import { factory } from 'typeorm-seeding';
import Faker from 'faker';
import Course, { Kind, Level, Shift } from '@src/models/Course';
import University from '@src/models/University';
import Offer from '@src/models/Offer';
import Campus from '@src/models/Campus';
import { OfferView } from '@src/views/offer';
import { CourseView } from '@src/views/course';

interface CourseFake {
  name?: string;
  university?: number;
  campus?: number;
  kind?: Kind;
  level?: Level;
  shift?: Shift;
}

interface OfferFake {
  course?: number;
  university?: number;
  campus?: number;
  full_price?: number;
  price_with_discount?: number;
  discount_percentage?: number;
  start_date?: number;
  enrollment_semester?: number;
  enabled?: boolean;
}

interface UniversityFake {
  name?: string;
  score?: number;
  logo_url?: string;
}

interface CampusFake {
  name?: string;
  city?: string;
}

export default {
  getCourseObj(): CourseView {
    return {
      course: {
        name: expect.any(String),
        kind: expect.any(String),
        level: expect.any(String),
        shift: expect.any(String),
        university: {
          name: expect.any(String),
          score: expect.any(Number),
          logo_url: expect.any(String),
        },
        campus: {
          name: expect.any(String),
          city: expect.any(String),
        },
      },
    };
  },

  getOfferObj(): OfferView {
    return {
      full_price: expect.any(Number),
      price_with_discount: expect.any(Number),
      discount_percentage: expect.any(Number),
      start_date: expect.any(String),
      enrollment_semester: expect.any(Number),
      enabled: expect.any(Boolean),
      course: {
        name: expect.any(String),
        kind: expect.any(String),
        level: expect.any(String),
        shift: expect.any(String),
      },
      university: {
        name: expect.any(String),
        score: expect.any(Number),
        logo_url: expect.any(String),
      },
      campus: {
        name: expect.any(String),
        city: expect.any(String),
      },
    };
  },

  async createOffer(offer: OfferFake): Promise<Offer> {
    return await factory(Offer)().create({
      course: offer.course || Faker.random.number({ min: 1, max: 10 }),
      university: offer.university || Faker.random.number({ min: 1, max: 10 }),
      campus: offer.campus || Faker.random.number({ min: 1, max: 10 }),
      full_price:
        offer.full_price || Faker.random.number({ min: 200, max: 4000 }),
      enrollment_semester:
        offer.enrollment_semester ||
        Faker.random.number({ min: 200, max: 2000 }),
      discount_percentage:
        offer.discount_percentage || Faker.random.number({ min: 0, max: 20 }),
      price_with_discount:
        offer.price_with_discount ||
        Faker.random.number({ min: 200, max: 3000 }),
      start_date: offer.start_date || Faker.date.future(),
      enabled: offer.enabled || Faker.random.boolean(),
    });
  },

  async createCourse(course: CourseFake): Promise<Course> {
    return await factory(Course)().create({
      name: course.name || Faker.name.jobTitle(),
      university: course.university || Faker.random.number({ min: 1, max: 5 }),
      campus: course.campus || Faker.random.number({ min: 1, max: 5 }),
      kind: course.kind || Kind.PRESENTIAL,
      level: course.level || Level.BACHELOR_DEGREE,
      shift: course.shift || Shift.EVENING,
    });
  },

  async createUniversity(university: UniversityFake): Promise<University> {
    return await factory(University)().create({
      name: university.name || Faker.name.jobTitle(),
      score:
        university.score || Number((Math.random() * (5 - 3) + 3).toFixed(2)),
      logo_url: university.logo_url || Faker.image.business(80, 80),
    });
  },

  async createCampus(campus: CampusFake): Promise<Campus> {
    return await factory(Campus)().create({
      name: campus.name || Faker.name.jobTitle(),
      city: campus.city || Faker.name.jobTitle(),
    });
  },
};
