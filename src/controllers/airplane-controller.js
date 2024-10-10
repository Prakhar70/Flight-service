const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessReponse } = require("../utils/common");

/**
 * POST :/airplanes
 * req-body {modelNumber: 'airbus320',capacity:200}
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessReponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET :/airplanes
 * req-body {}
 */
async function getAirplanes(req, res){
  try{
    const airplane = await AirplaneService.getAirplanes();
    SuccessReponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET :/airplanes/:id
 * req-body {}
 */
async function getAirplane(req, res){
  try{
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessReponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane
};
