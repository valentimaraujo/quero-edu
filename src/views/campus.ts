import Campus from '@src/models/Campus';

export interface CampusView {
  name: string;
  city: string;
}

export default {
  render(campus: Campus): CampusView {
    return {
      name: campus.name,
      city: campus.city,
    };
  },

  renderMany(campus: Campus[]) {
    return campus.map((campus) => this.render(campus));
  },
};
