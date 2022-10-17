const { insert, list, modify, remove, findOne } = require("../services/Tasks");
const httpStatus = require("http-status");
const Mongoose = require("mongoose");

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

const deleteTask = (req, res) => {
    if(!req.params.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "haven't find ID info"
        });
    }
    remove(req.params?.id).then((deletedDoc) => {
        if(!deletedDoc){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "no such task was found"
            })
        }
        res.status(httpStatus.OK).send({
            message: "the task has been deleted"
        })
    }).catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "a problem occurred during deletion process" }) })
}

const makeComment = (req, res) => {
    findOne({ _id : req.params.id }).then((mainTask) => {//find one
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({message: "couldn't find this task"})
        const comment = {
            ...req.body,
            commented_at : new Date(),
            user_id : req.user
        };
        mainTask.comments.push(comment);
        mainTask
            .save()
            .then((updatedDoc) => {
                return res.status(httpStatus.OK).send(updatedDoc)
            })
            .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) });
    })
    .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) });
}

const deleteComment = (req, res) => {
    findOne({ _id : req.params.id }).then((mainTask) => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({message: "couldn't find this task"})
        const isCommentId = mainTask.comments.find((e) => e._id?.toString() === req.params.commentId);
        if( isCommentId ) {
            mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
            mainTask
            .save()
            .then((updatedDoc) => {
                return res.status(httpStatus.OK).send(updatedDoc);
            })
            .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) });
        }
        else {
            return res.status(httpStatus.NOT_FOUND).send({message: "couldn't find this comment id"})
        }
    })
    .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) });
}

const addSubTask = (req,res) => {
    if(!req.params.id) return res.status(httpStatus.NOT_FOUND).send({message: "couldn't find this task"})
    findOne({ _id : req.params.id }).then((mainTask) => {//find one
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({message: "couldn't find this task"})
        req.body.user_id = req.user;
        insert(req.body)
        .then((subTask) => {
            mainTask.sub_tasks.push(subTask)
            mainTask
            .save()
            .then((updatedDoc) => {
                return res.status(httpStatus.OK).send(updatedDoc)
            })
            .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "couldn't be registered" }) });
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        })
    })
    .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : e }) });
}            

 module.exports = {
     create,
     index,
     update,
     deleteTask,
     makeComment,
     deleteComment,
     addSubTask
 }