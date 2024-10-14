const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      
      error.errors.forEach(err => {
        explaination.push(err.message);
      });
      
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("Cannot create a new flight object", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllFlights(query) {
    let customFilters={};
    let sortFilter=[];
    //trips = MUM-DEL    
    const endingTripTime = ' 23:59:00';

    if(query.trips){
        [departureAirportId, arrivalAirportId ] = query.trips.split('-');
        customFilters.departureAirportId = departureAirportId;
        customFilters.arrivalAirportId = arrivalAirportId;
        //TODO: add check id they are not same
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilters.price = {
            [Op.between] : [minPrice, maxPrice]
        }
    }
    if(query.travellers){
        customFilters.totalSeats = {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        
        customFilters.departureTime = {
            [Op.between]:[query.tripDate, query.tripDate+endingTripTime]
        }
    }
    if(query.sort){
        
        const params = query.sort.split(',');
        const sortFilters = params.map((params)=>params.split('_'));
        sortFilter = sortFilters
    }
    try{
        const flights = await flightRepository.getAllFlights(customFilters);
        return flights;
    }catch{
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try{
        console.log('service', id)
        const flight = await flightRepository.get(id);
        return flight;
      }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
          throw new AppError(`Flight you requested is not present`, error.statusCode);
        }
        throw new AppError(`Cannot fetch data of requested flight `, StatusCodes.INTERNAL_SERVER_ERROR);
      }
}

async function updateSeats(data){
    try{
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    }catch(error){
        console.log(error);
        throw new AppError(`Cannot update data of requested flight `, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
