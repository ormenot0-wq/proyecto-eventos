import { UsersDAO } from "../dao/users.dao.js";

export const UsersRepository = {
  async findByEmail(email) {
    return await UsersDAO.findByEmail(email);
  },

  async create(userData) {
    return await UsersDAO.create(userData);
  }
};