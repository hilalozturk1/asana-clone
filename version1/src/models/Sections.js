const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Sections")

const SectionSchema = new Mongoose.Schema({
    name : "String",
    user_id : {
        type : Mongoose.Types.ObjectId,
        ref : "user"
    },
    project_id : {
         type: Mongoose.Types.ObjectId,
         ref : "project"
    }, 
    order : {
        type: Number
    }
},{
    timestamps : true , versionKey : false
});

SectionSchema.post("save", (object) => {//before save - loggin
    console.log("POST", object);
    logger.log({
        level : "info",
        message : object
    });
})

module.exports = Mongoose.model("section", SectionSchema)