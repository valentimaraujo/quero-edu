import University from '@src/models/University';

export interface UniversityView {
  name: string;
  score: number;
  logo_url: string;
}

export default {
  render(university: University): UniversityView {
    return {
      name: university.name,
      score: university.score,
      logo_url: university.logo_url,
    };
  },

  renderMany(university: University[]) {
    return university.map((university) => this.render(university));
  },
};
