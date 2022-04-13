const express = require("express");
const helmet = require("helmet");

const app = express();
app.use(express.json());// express gives us the information in json body
app.use(helmet());

app.listen(PORT, () => {
    console.log("server stood up");
})