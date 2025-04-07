const express = require("express");
const router = express.Router();
const { body} = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  rsvpToEvent,
  getAttendeeCount,
} = require("../controllers/attendingController");



const eventController = require("../controllers/eventController");

const validateEvent = [
    body("name").notEmpty().withMessage("Event name is required"),
    body("date").isISO8601().withMessage("Invalid date format (use YYYY-MM-DD)"),
    body("location").notEmpty().withMessage("Location is required"),
  ];

//API routes imp**
router.post("/",authMiddleware, validateEvent, eventController.createEvent);  // Create event && validation
router.get("/", eventController.getAllEvents); // Get all events
router.get("/:id",authMiddleware, eventController.getEventById); // Get event by ID
router.put("/:id", eventController.updateEvent); // Update event
router.delete("/:id",authMiddleware, eventController.deleteEvent); // deletion with auth
router.post("/:id/rsvp", authMiddleware, rsvpToEvent); // revp with auth
router.get("/:id/attending-count", getAttendeeCount); // fetch total count


module.exports = router;
