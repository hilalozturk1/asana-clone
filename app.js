const express = require("express");
const app  = express();

app.get("/", (req,res) => {
    res.status(200).send({
        message : "Rest API"
    })
})

app.listen(3232, () => {
    console.log("working on 3232 port");
})