const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessReponse } = require("../utils/common");

/**
 * POST :/flights
 * req-body {
 *  flightNumber:'UK-121'
 *  airplaneId:'a830'
 *  departureAirportId:'DEL'
 *  arrivalAirportId:'BLR'
 *  arrivalTime:'11:10:00'
 *  departureTime:'11:50:00'
 *  price:1223
 *  boardingGate:'12A'
 *  totalSeats:12
 * "}
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber:req.body.flightNumber,
      airplaneId:req.body.airplaneId,
      departureAirportId:req.body.departureAirportId,
      arrivalAirportId:req.body.arrivalAirportId,
      arrivalTime:req.body.arrivalTime,
      departureTime:req.body.departureTime,
      price:req.body.price,
      boardingGate:req.body.boardingGate,
      totalSeats:req.body.totalSeats
    });
    SuccessReponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAllFlights(req, res){
    try{
        const flights = await FlightService.getAllFlights(req.query);
        SuccessReponse.data = flights;
        return res.status(StatusCodes.CREATED).json(SuccessReponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights
};
