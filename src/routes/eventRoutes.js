const express = require("express");
const router = express.Router();

const eventController = require("./../controllers/eventController");

// Routers
router
  .route(`/`)
  .get(eventController.getEvent)
  .post(eventController.createEvent)
  .delete(eventController.deleteEventByDayOfWeek);

router
  .route(`/:id`)
  .get(eventController.getEventById)
  .delete(eventController.deleteEventById);

module.exports = router;
 