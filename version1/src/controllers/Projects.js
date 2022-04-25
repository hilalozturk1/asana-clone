const { insert, list, modify, remove } = require("../services/Projects");
const httpStatus = require("http-status");
const create = (req, res) => {
    req.body.user_id = req.user;
    insert(req.body)
    .then((response) => {
        res.status(httpStatus.CREATED).send(response);//201
    })
    .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
};

const index = (req, res) => {//to get responses to all projects
    list().then((response) => {
        res.status(httpStatus.OK).send(response);
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e) });
};

const update = (req, res) => {
    if(!req.params.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "haven't find ID info"
        });
    }
    modify(req.body, req.params?.id).then((updatedProject) => {
        res.status(httpStatus.OK).send(updatedProject)
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) })
}

const deleteProject = (req, res) => {
    if(!req.params.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "haven't find ID info"
        });
    }
    remove(req.params?.id).then((deletedProject) => {
        if(!deletedProject){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "no such project was found"
            })
        }
        res.status(httpStatus.OK).send({
            message: "the project has been deleted"
        })
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "a problem occurred during deletion process" }) })
}

 module.exports = {
     create,
     index,
     update,
     deleteProject
 }