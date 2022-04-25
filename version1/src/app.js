const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const config = require("./config");
const {ProjectRoutes, UserRoutes} = require("./api-routes");
const loaders = require("./loaders");
const events = require("./scripts/events");

config();
loaders();
events();

const app = express();
app.use(express.json());// express gives us the information in json body
app.use(helmet());
app.use(fileUpload());

app.listen(process.env.APP_PORT, () => {
    console.log("server stood up");
    app.use("/projects", ProjectRoutes.router);
    app.use("/users", UserRoutes);
})