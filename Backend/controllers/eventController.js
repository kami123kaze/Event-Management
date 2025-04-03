const { Event } = require("../models"); 
const { validationResult } = require("express-validator");
// Create  event
const createEvent = async (req, res) => {
    const errors = validationResult(req); //validation here insted of the middleware since, multiple instances of same validation not required
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const event = await Event.create(req.body);
      
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get  events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update  event
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        await event.update(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete  event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        await event.destroy();
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
