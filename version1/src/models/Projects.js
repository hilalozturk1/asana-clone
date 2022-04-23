const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Projects")

const ProjectSchema = new Mongoose.Schema({
    name : "String",
    user_id : {
        type : Mongoose.Types.ObjectId,
        ref : "user"
    }
},{
    timestamps : true , versionKey : false
});

// ProjectSchema.pre("save", (next, doc) => {//model hooks
//     console.log('PRE', doc)
//     next();
// })

ProjectSchema.post("save", (object) => {
    console.log("POST", object);//logging
    logger.log({
        level : "info",
        message : object
    });
})

module.exports = Mongoose.model("project", ProjectSchema)