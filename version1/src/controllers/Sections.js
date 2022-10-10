const { insert, list, modify, remove } = require("../services/Sections");
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
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error : "project information is missing.."})
    list( {project_id : req.params.projectId } ).then((response) => {
        res.status(httpStatus.OK).send(response);
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e) });
};

const update = (req, res) => {
    if(!req.params.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "haven't find ID info"
        });
    }
    modify(req.body, req.params?.id).then((updatedDoc) => {
        res.status(httpStatus.OK).send(updatedDoc)
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) })
}

const deleteSection = (req, res) => {
    if(!req.params.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "haven't find ID info"
        });
    }
    remove(req.params?.id).then((deletedDoc) => {
        if(!deletedDoc){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "no such section was found"
            })
        }
        res.status(httpStatus.OK).send({
            message: "the section has been deleted"
        })
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "a problem occurred during deletion process" }) })
}

 module.exports = {
     create,
     index,
     update,
     deleteSection
 }