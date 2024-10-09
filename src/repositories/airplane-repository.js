const CRUDRespository = require("./crud-repository");
const { Airplane } = require("../models");

class AirplaneRepository extends CRUDRespository {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
