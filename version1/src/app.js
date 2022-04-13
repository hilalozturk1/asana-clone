const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const {ProjectRoutes} = require("./api-routes");
config();

const app = express();
app.use(express.json());// express gives us the information in json body
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
    console.log("server stood up");
    app.use("/projects", ProjectRoutes.router);
})