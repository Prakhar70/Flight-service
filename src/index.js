const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const logger = require("./config/logger-config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  //logger.info("Called form listen");
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

  //bad code alert
  const {City, Airport} = require('./models');
  // const bengaluru = await City.findByPk(12);
  // const kmairport = bengaluru.createAirport({name:'Hubaali Airport',code:'HUB'})

  // await bengaluru.removeAirport(kmairport);

  await City.destroy({
    where:{
      id:12
    }
  });
});
