const { insert } = require("../services/Projects");

const create = (req, res) => {
    insert({ name:"hilal", lname:"ozturk"})
    res.status(200).send("Project Create");
};

const index = (req, res) => {//to get responses to all projects
    res.status(200).send("Project index")
}
 module.exports = {
     create,
     index
 }