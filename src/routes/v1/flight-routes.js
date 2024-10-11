const express = require("express");

const { FlightControler } = require('../../controllers')
const { FlightMiddleware } = require('../../middlewares')

const router = express.Router();

// /api/v1/flights POST
router.post('/', 
    FlightMiddleware.validateCreateRequest, 
    FlightControler.createFlight);

// /api/v1/flights?trips=MUM-DEL GET
router.get('/', 
    FlightControler.getAllFlights);

module.exports = router;