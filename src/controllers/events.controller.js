import { EventModel } from "../models/event.js";

export const EventsController = {
  async list(req, res, next) {
    try {
      const events = await EventModel.find().sort({ startsAt: 1 });

      return res.status(200).json({
        status: "success",
        payload: events
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const event = await EventModel.findById(req.params.id);

      if (!event) {
        return res.status(404).json({
          status: "error",
          message: "Evento no encontrado"
        });
      }

      return res.status(200).json({
        status: "success",
        payload: event
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { title, description, startsAt, location } = req.body;

      const event = await EventModel.create({
        title,
        description,
        startsAt,
        location
      });

      return res.status(201).json({
        status: "success",
        payload: event
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const event = await EventModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!event) {
        return res.status(404).json({
          status: "error",
          message: "Evento no encontrado"
        });
      }

      return res.status(200).json({
        status: "success",
        payload: event
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const event = await EventModel.findByIdAndDelete(req.params.id);

      if (!event) {
        return res.status(404).json({
          status: "error",
          message: "Evento no encontrado"
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Evento eliminado correctamente"
      });
    } catch (error) {
      next(error);
    }
  }
};
