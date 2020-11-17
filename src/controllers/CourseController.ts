import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import courseView from '@src/views/course';

const queryFilterBuild = async (req: Request): Promise<string> => {
  const {
    university = undefined,
    city = undefined,
    kind = undefined,
    level = undefined,
    shift = undefined,
  } = req.query;

  const SQL_FILTER: any = [];
  let WHERE_CLAUSE: string = '';

  if (university) {
    SQL_FILTER.push(`LOWER(universities.name) LIKE LOWER('%${university}%')`);
  }

  if (city) {
    SQL_FILTER.push(`LOWER(campus.city) LIKE LOWER('%${city}%')`);
  }

  if (kind) {
    SQL_FILTER.push(`LOWER(courses.kind) = LOWER('${kind}')`);
  }

  if (shift || level) {
    const SHIFT_OR_LEVEL: any = [];
    let WHERE_CLAUSE_SHIFT_OR_LEVEL: string = '';
    SHIFT_OR_LEVEL.push(shift && `LOWER(courses.shift) = LOWER('${shift}')`);
    SHIFT_OR_LEVEL.push(level && `LOWER(courses.level) = LOWER('${level}')`);

    WHERE_CLAUSE_SHIFT_OR_LEVEL = `(${SHIFT_OR_LEVEL.filter(
      (v: string) => v !== null
    ).join(' OR ')})`;
    SQL_FILTER.push(WHERE_CLAUSE_SHIFT_OR_LEVEL);
  }

  if (SQL_FILTER.length) {
    WHERE_CLAUSE = `WHERE ${SQL_FILTER.join(' AND ')}`;
  }

  return WHERE_CLAUSE;
};

export default {
  async index(req: Request, res: Response) {
    const offerQuery = getManager();
    try {
      const WHERE_CLAUSE = await queryFilterBuild(req);
      const courses = await offerQuery.query(`
      SELECT
        courses.name AS courses_name,
        courses.kind AS courses_kind,
        courses.level AS courses_level,
        courses.shift AS courses_shift,
        universities.name AS universities_name,
        universities.score AS universities_score,
        universities.logo_url AS universities_logo_url,
        campus.name AS campus_name,
        campus.city AS campus_city
      FROM courses
      INNER JOIN universities ON (courses.university_id = universities.id)
      INNER JOIN campus ON (courses.campus_id = campus.id)
      ${WHERE_CLAUSE}
    `);

      res.status(200).json(courseView.renderMany(courses));
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
