const { StatusCodes } = require("http-status-codes");
const { AirportRespository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRespository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      
      error.errors.forEach(err => {
        explaination.push(err.message);
      });
      
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("Cannot create a new airport object", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirports() {
  try{
    const airports = await airportRepository.getAll();
    return airports;
  }catch(error){
    throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirport(id) {
  try{
    const airport = await airportRepository.get(id);
    return airport;
  }catch(error){
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(`Airport you requested is not present`, error.statusCode);
    }
    throw new AppError(`Cannot fetch data of requested airport `, StatusCodes.INTERNAL_SERVER_ERROR);
  }
  
}
async function destroyAirport(id) {
  try{
    const airport = await airportRepository.destroy(id);
    return airport;
  }catch(error){
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(`Airport you are trying to delete is not present`, error.statusCode);
    }
    throw new AppError(`Cannot delete data of requested airport `, StatusCodes.INTERNAL_SERVER_ERROR);
  }
  
}

async function updateAirport(id, data) {
  try{
    const airplane = await airportRepository.update(id, data);
    return airplane;
  }catch(error){
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(`Airport you are trying to update is not present`, error.statusCode);
    }
    throw new AppError(`Cannot update data of requested airport `, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports = {
 createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
