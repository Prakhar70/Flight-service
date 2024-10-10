const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessReponse } = require("../utils/common");

/**
 * POST :/cities
 * req-body {name:'London'}
 */
async function createCity(req, res) {
    try {
      const city = await CityService.createCity({
        name:req.body.name
      });
      SuccessReponse.data = city;
      return res.status(StatusCodes.CREATED).json(SuccessReponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

  module.exports = {
    createCity
  };