const Task = require("../models/Tasks")

const findOne = (where, expand) => {
    if(expand) {
        return Task.findOne(where)
        .populate({
            path: "user_id",
            select: "full_name email profile_image"
        })
        .populate({
            path: "comments",
            populate: {
                path: "user_id",
                select: "full_name email profile_image"
            }
        })
        .populate({
            path: "sub_tasks",
            select: "title sub_tasks"
        })
    }
    return Task.findOne(where);
}

const insert = (data) => {
    const Tasks = new Task(data);
    return Tasks.save();
};

const list = (where) => {
    return Task.find(where || {})
        .populate({
            path: "user_id",
            select: "full_name email profile_image",
        })
}

const modify = (data, id) => {
    return Task.findByIdAndUpdate(id, data, { new: true});
}

const remove = (id) => {
    return Task.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    modify,
    remove,
    findOne
}