//service layer usually performs registration on model-
const Project = require("../models/Projects")
const insert = (projectData) => {
    const projects = new Project(projectData);
    return projects.save();
};

const list = () => {
    return Project.find({}).populate({
        path: "user_id",
        select: "full_name email",
    });
}

const modify = (data, id) => {
    return Project.findByIdAndUpdate(id, data, { new: true});
}

module.exports = {
    insert,
    list,
    modify
}