const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explaination = [];

      error.errors.forEach((err) => {
        explaination.push(err.message);
      });

      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyCity(id) {
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `Airplane you are trying to delete is not present`,
        error.statusCode
      );
    }
    throw new AppError(
      `Cannot delete data of requested airplane `,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
    try{
      const city = await cityRepository.update(id, data);
      return ;
    }catch(error){
       
      if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError(`City you are trying to update is not present`, error.statusCode);
      }
      throw new AppError(`Cannot update data of requested city `, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
module.exports = {
  createCity,
  destroyCity,
  updateCity
};
