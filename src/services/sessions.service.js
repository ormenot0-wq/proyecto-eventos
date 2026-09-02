import { UsersRepository } from "../repositories/users.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const SessionsService = {

  async register({ first_name, last_name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UsersRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      const error = new Error("El email ya está registrado");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await UsersRepository.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    return user;
  },

  async login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await UsersRepository.findByEmail(normalizedEmail);

    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      const error = new Error("Credenciales inválidas");
      error.status = 401;
      throw error;
    }

    return user;
  }

};
