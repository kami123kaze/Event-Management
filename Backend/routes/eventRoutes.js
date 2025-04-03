const express = require("express");
const router = express.Router();
const { body} = require("express-validator");


const eventController = require("../controllers/eventController");

const validateEvent = [
    body("name").notEmpty().withMessage("Event name is required"),
    body("date").isISO8601().withMessage("Invalid date format (use YYYY-MM-DD)"),
    body("location").notEmpty().withMessage("Location is required"),
  ];

//API routes imp**
router.post("/", validateEvent, eventController.createEvent);  // Create event && validation
router.get("/", eventController.getAllEvents); // Get all events
router.get("/:id", eventController.getEventById); // Get event by ID
router.put("/:id", eventController.updateEvent); // Update event
router.delete("/:id", eventController.deleteEvent); // Delete event

module.exports = router;
