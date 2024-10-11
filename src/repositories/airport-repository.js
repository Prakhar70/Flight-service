const CRUDRespository = require("./crud-repository");
const { Airport } = require("../models");

class AirportRepository extends CRUDRespository {
  constructor() {
    super(Airport);
  }
}

module.exports = AirportRepository;
