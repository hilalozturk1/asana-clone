//service layer usually performs registration on model-
const Section = require("../models/Sections")
const insert = (sectionData) => {
    const Sections = new Section(sectionData);
    return Sections.save();
};

const list = (where) => {
    return Section.find(where || {})
        .populate({
            path: "user_id",
            select: "full_name email profile_image",
        })
        .populate({
            path: "project_id",
            select: "name",
        })
}

const modify = (data, id) => {
    return Section.findByIdAndUpdate(id, data, { new: true});
}

const remove = (id) => {
    return Section.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    modify,
    remove
}