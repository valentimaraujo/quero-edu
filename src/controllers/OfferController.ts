import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import offerView from '@src/views/offer';

export default {
  async index(req: Request, res: Response) {
    const offerQuery = getManager();
    const {
      kind = null,
      level = null,
      shift = null,
      university = null,
      course = null,
      city = null,
      orderByValue = null,
    } = req.query;

    let SQL_FILTER: any = [];
    let WHERE_CLAUSE: string = '';
    let ORDER_CLAUSE: string = '';
    const ORDER = ['DESC', 'ASC'];

    if (course) {
      SQL_FILTER.push(`LOWER(courses.name) LIKE LOWER('%${course}%')`);
    }

    if (kind) {
      SQL_FILTER.push(`LOWER(courses.kind) = LOWER('${kind}')`);
    }

    if (level) {
      SQL_FILTER.push(`LOWER(courses.level) = LOWER('${level}')`);
    }

    if (university) {
      SQL_FILTER.push(`LOWER(universities.name) LIKE LOWER('%${university}%')`);
    }

    if (shift || city) {
      const SHIFT_OR_LEVEL: any = [];
      let WHERE_CLAUSE_SHIFT_OR_LEVEL: string = '';
      SHIFT_OR_LEVEL.push(shift && `LOWER(courses.shift) = LOWER('${shift}')`);
      SHIFT_OR_LEVEL.push(city && `LOWER(campus.city) LIKE LOWER('%${city}%')`);

      WHERE_CLAUSE_SHIFT_OR_LEVEL = `(${SHIFT_OR_LEVEL.filter(
        (v: string) => v !== null
      ).join(' OR ')})`;
      SQL_FILTER.push(WHERE_CLAUSE_SHIFT_OR_LEVEL);
    }

    if (orderByValue && ORDER.includes(String(orderByValue).toUpperCase())) {
      ORDER_CLAUSE = `ORDER BY offers.price_with_discount ${orderByValue}`;
    }

    if (SQL_FILTER.length) {
      WHERE_CLAUSE = `WHERE ${SQL_FILTER.join('AND ')}`;
    }

    try {
      const offers = await offerQuery.query(`
      SELECT
        offers.full_price AS offers_full_price, 
        offers.price_with_discount AS offers_price_with_discount, 
        offers.discount_percentage AS offers_discount_percentage, 
        offers.enrollment_semester AS offers_enrollment_semester, 
        offers.enabled AS offers_enabled, 
        offers.start_date AS offers_start_date,
        courses.name AS courses_name, 
        courses.kind AS courses_kind, 
        courses.level AS courses_level, 
        courses.shift AS courses_shift,
        universities.name AS universities_name, 
        universities.score AS universities_score, 
        universities.logo_url AS universities_logo_url,
        campus.name AS campus_name, 
        campus.city AS campus_city
      FROM offers
      INNER JOIN courses ON (offers.course_id = courses.id)
      INNER JOIN universities ON (offers.university_id = universities.id)
      INNER JOIN campus ON (offers.campus_id = campus.id)
      ${WHERE_CLAUSE}
      ${ORDER_CLAUSE}
    `);

      res.status(200).json(offerView.renderMany(offers));
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
