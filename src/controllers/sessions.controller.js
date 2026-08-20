export const SessionsController = {
  async login(req, res) {
    return res.status(501).json({
      status: "error",
      message: "Autenticación pendiente de implementación"
    });
  }
};