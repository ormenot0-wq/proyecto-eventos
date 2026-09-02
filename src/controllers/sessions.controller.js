
import { SessionsService } from "../services/sessions.service.js";

export const SessionsController = {

  async register(req, res, next) {

    try {

      const {
        first_name,
        last_name,
        email,
        password
      } = req.body;

      // Validar campos obligatorios
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Faltan campos obligatorios"
        });
      }

      // Validar formato del email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          status: "error",
          message: "El email no tiene un formato válido"
        });
      }

      // Validar longitud mínima de contraseña
      if (password.length < 8) {
        return res.status(400).json({
          status: "error",
          message: "La contraseña debe tener al menos 8 caracteres"
        });
      }

      const user = await SessionsService.register({
        first_name,
        last_name,
        email,
        password
      });

      // Nunca devolver password
      return res.status(201).json({
        status: "success",
        payload: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {

      if (error.status === 409) {
        return res.status(409).json({
          status: "error",
          message: error.message
        });
      }

      console.error(error);

      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor"
      });
    }
  },

  async login(req, res) {

    try {

      const { email, password } = req.body;

      // Validar campos obligatorios
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email y contraseña son obligatorios"
        });
      }

      const user = await SessionsService.login({
        email,
        password
      });

      return res.status(200).json({
        status: "success",
        payload: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {

      if (error.status === 401) {
        return res.status(401).json({
          status: "error",
          message: error.message
        });
      }

      console.error(error);

      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor"
      });
    }
  }

};

