const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    
    if (error.name == "SequelizeValidationError") {
      let explaination = [];
      
      error.errors.forEach(err => {
        explaination.push(err.message);
      });
      
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("Cannot create a new airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplanes() {
  try{
    const airplane = await airplaneRepository.getAll();
    return airplane;
  }catch(error){
    throw new AppError('Cannot fetch data of all the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplane(id) {
  try{
    const airplane = await airplaneRepository.get(id);
    return airplane;
  }catch(error){
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(`Airplane you requested is not present`, error.statusCode);
    }
    throw new AppError(`Cannot fetch data of requested airplane `, StatusCodes.INTERNAL_SERVER_ERROR);
  }
  
}
async function destroyAirplane(id) {
  try{
    const airplane = await airplaneRepository.destroy(id);
    return airplane;
  }catch(error){
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(`Airplane you are trying to delete is not present`, error.statusCode);
    }
    throw new AppError(`Cannot delete data of requested airplane `, StatusCodes.INTERNAL_SERVER_ERROR);
  }
  
}

async function updateAirplane(id, data) {
  try{
    const airplane = await airplaneRepository.update(id, data);
    return airplane;
  }catch(error){
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(`Airplane you are trying to update is not present`, error.statusCode);
    }
    throw new AppError(`Cannot update data of requested airplane `, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
