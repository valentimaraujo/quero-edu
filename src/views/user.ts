import User from '@src/models/User';

export interface UserView {
  name: string;
  email: string;
}

export default {
  render(user: User): UserView {
    return {
      name: user.name,
      email: user.email,
    };
  },

  renderMany(user: User[]) {
    return user.map((user) => this.render(user));
  },
};
