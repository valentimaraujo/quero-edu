import Course from '@src/models/Course';

export interface CourseOffersView {
  name: string;
  kind: string;
  level: string;
  shift: string;
}

export default {
  render(course: Course): CourseOffersView {
    return {
      name: course.name,
      kind: course.kind,
      level: course.level,
      shift: course.shift,
    };
  },

  renderMany(course: Course[]) {
    return course.map((course) => this.render(course));
  },
};
