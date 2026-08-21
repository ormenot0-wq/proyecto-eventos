import { UserModel } from "../models/user.js";

export const SessionsController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email y contraseña son obligatorios"
        });
      }

      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user || user.password !== password) {
        return res.status(401).json({
          status: "error",
          message: "Email o contraseña incorrectos"
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Login exitoso",
        payload: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  }
};