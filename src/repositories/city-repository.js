const CRUDRespository = require("./crud-repository");
const { City } = require("../models");

class CityRepository extends CRUDRespository {
  constructor() {
    super(City);
  }
}

module.exports = CityRepository;