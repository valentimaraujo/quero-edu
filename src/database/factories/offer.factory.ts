import Offer from '@src/models/Offer';
import Faker from 'faker';
import { define } from 'typeorm-seeding';

define(Offer, (faker: typeof Faker) => {
  const offer = new Offer();

  const discountPercentage = faker.random.number({ min: 0, max: 20 });
  const fullPrice = faker.random.number({ min: 200, max: 4000 });
  const enrollmentSemester = parseFloat(String(fullPrice / 6)).toFixed(2);
  const priceWithDiscount = parseFloat(
    String(fullPrice - (discountPercentage / 100) * fullPrice)
  ).toFixed(2);

  // @ts-ignore
  offer.course = faker.random.number({ min: 1, max: 10 });
  // @ts-ignore
  offer.university = faker.random.number({ min: 1, max: 10 });
  // @ts-ignore
  offer.campus = faker.random.number({ min: 1, max: 10 });
  offer.full_price = fullPrice;
  offer.enrollment_semester = Number(enrollmentSemester);
  offer.discount_percentage = discountPercentage;
  offer.price_with_discount = Number(priceWithDiscount);
  offer.start_date = faker.date.future();
  offer.enabled = faker.random.boolean();
  return offer;
});
