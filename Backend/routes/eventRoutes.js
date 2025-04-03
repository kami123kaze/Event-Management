const express = require("express");
const router = express.Router();


const eventController = require("../controllers/eventController");

//API routes imp**
router.post("/", eventController.createEvent);  // Create event
router.get("/", eventController.getAllEvents); // Get all events
router.get("/:id", eventController.getEventById); // Get event by ID
router.put("/:id", eventController.updateEvent); // Update event
router.delete("/:id", eventController.deleteEvent); // Delete event

module.exports = router;
