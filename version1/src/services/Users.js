const User = require("../models/Users");

const insert = (userData) => {
    const user = new User(userData);
    return user.save();
};

const loginUser = (loginData) => {
    return User.findOne(loginData)
}

const list = () => {
    return User.find({});
};

const modify = (where, data) => {
    return User.findOneAndUpdate(where, data, { new: true });
}

module.exports = {
    insert,
    list,
    loginUser,
    modify
}