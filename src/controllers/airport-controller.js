const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessReponse } = require("../utils/common");

/**
 * POST :/airports
 * req-body {name:"Amausi", cityId:5, code:"LKO",address:"30,asda"}
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name:req.body.name,
      code:req.body.code,
      address:req.body.address,
      cityId:req.body.cityId
    });
    SuccessReponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET :/airports
 * req-body {}
 */
async function getAirports(req, res){
  try{
    
    const airports = await AirportService.getAirports();
    SuccessReponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET :/airports/:id
 * req-body {}
 */
async function getAirport(req, res){
  try{
    console.log("get Airports",req.params.id);
    const airport = await AirportService.getAirport(req.params.id);
    SuccessReponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * DELETE :/airports/:id
 * req-body {}
 */
async function destroyAirport(req, res){
  try{
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessReponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * PATCH :/airplane/:id
 * req-body { col : value, ...}
 */
async function updateAirport(req, res){
  try{
   
    const airport = await AirportService.updateAirport(req.params.id, req.body);
    SuccessReponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessReponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
