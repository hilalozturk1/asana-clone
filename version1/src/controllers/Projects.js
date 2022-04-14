const { insert } = require("../services/Projects");
const httpStatus = require("http-status");
const create = (req, res) => {
    insert(req.body)
    .then((response) => {
        res.status(httpStatus.CREATED).send(response);//201
    })
    .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
};

const index = (req, res) => {//to get responses to all projects
    res.status(200).send("Project index")
}
 module.exports = {
     create,
     index
 }