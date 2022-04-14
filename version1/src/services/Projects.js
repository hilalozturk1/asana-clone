//service layer usually performs registration on model-
const Project = require("../models/Projects")
const insert = (projectData) => {
    const projects = new Project(projectData);
    return projects.save();
};

const list = () => {
    return Project.find({});//return value with find
}

module.exports = {
    insert,
    list
}