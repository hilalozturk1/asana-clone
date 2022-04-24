const { insert, list, loginUser, modify } = require("../services/Users");
const projectService = require("../services/Projects");
const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const uuid = require("uuid");

const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
};

const login = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    loginUser(req.body)
        .then((user) => {
            if (!user)
                return res.status(httpStatus.NOT_FOUND).send({ message: "the user not found" })
            user = {
                ...user.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                },
            };
            delete user.password;
            res.status(httpStatus.OK).send(user);
        })
        .catch((e) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e) })
}

const index = (req, res) => {
    list()
        .then((response) => {
            res.status(httpStatus.OK).send(response);
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        });
};

const projectsList = (req, res) => {
    projectService.list({ user_id : req.user?._id}).then((projects) => {
        res.status(httpStatus.OK).send(projects)
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "an unexpected error occurred while fetching projects"
    }))
}

const resetPassword = (req, res) => {
    const new_password = uuid.v4()?.split("-")[0] || new Date().getTime();
    modify({ email: req.body.email }, { password: passwordToHash(new_password) }).then((updatedUser) => {
        if(!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error : "there isn't any such user"})
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("an error occurred while resetting the password")
    });
}
module.exports = {
    create,
    index,
    login,
    projectsList,
    resetPassword
}