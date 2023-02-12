const express = require("express");
const router = express.Router();

const { getEvent, validEvent, ValidDateTime, createEvent, 
deleteEventByDayOfWeek, getEventById, deleteEventById} = require("./../controllers/eventController");

// Routers
router
  .route(`/`)
  .get(getEvent)
  .post(validEvent, ValidDateTime, createEvent)
  .delete(deleteEventByDayOfWeek);

router
  .route(`/:id`)
  .get(getEventById)
  .delete(deleteEventById);

module.exports = router;
 