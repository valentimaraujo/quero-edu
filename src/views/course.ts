import Course from '@src/models/Course';
import universityView, { UniversityView } from '@src/views/university';
import campusView, { CampusView } from '@src/views/campus';

export interface CourseView {
  course: {
    name: string;
    kind: string;
    level: string;
    shift: string;
    university: {
      name: string;
      score: number;
      logo_url: string;
    };
    campus: {
      name: string;
      city: string;
    };
  };
}

export default {
  render(course: any): CourseView {
    return {
      course: {
        name: course.courses_name,
        kind: course.courses_kind,
        level: course.courses_level,
        shift: course.courses_shift,
        university: {
          name: course.universities_name,
          score: course.universities_score,
          logo_url: course.universities_logo_url,
        },
        campus: {
          name: course.campus_name,
          city: course.campus_city,
        },
      },
    };
  },

  renderMany(course: Course[]) {
    return course.map((course) => this.render(course));
  },
};
