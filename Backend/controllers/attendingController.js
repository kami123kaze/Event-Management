const { Attending, Event } = require("../models");

const rsvpToEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const { change } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existing = await Attending.findOne({ where: { eventId, userId } });

    if (change === 1 && !existing) {
      await Attending.create({ eventId, userId });
      return res.status(200).json({ message: "RSVP'd successfully" });
    } else if (change === -1 && existing) {
      await existing.destroy();
      return res.status(200).json({ message: "Un-RSVP'd successfully" });
    }

    return res.status(400).json({ message: "Invalid RSVP state" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAttendeeCount = async (req, res) => {
  const { id: eventId } = req.params;

  try {
    const count = await Attending.count({ where: { eventId } });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch attending count" });
  }
};

module.exports = {
  rsvpToEvent,
  getAttendeeCount,
};
