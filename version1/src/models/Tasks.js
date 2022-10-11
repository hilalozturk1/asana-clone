const Mongoose = require("mongoose");
//const logger = require("../scripts/logger/Tasks")

const TaskSchema = new Mongoose.Schema({
    title : String,
    description : String,
    assigned_to : {
        type : Mongoose.Types.ObjectId,
        ref : "user"
    },
    due_date : Date,
    statuses : [String], //  there will be more than one string and will kept as an array
    user_id : {
        type : Mongoose.Types.ObjectId,
        ref : "user"
    },
    section_id : {
        type: Mongoose.Types.ObjectId,
        ref : "section"
    }, 
    project_id : {
         type: Mongoose.Types.ObjectId,
         ref : "project"
    }, 
    order : {
        type: Number
    },
    isCompleted : Boolean,
    comments : [
        {
            value : String,
            created_at : Date,
            updated_at : Date,
            user_id : {
                type : Mongoose.Types.ObjectId,
                ref : "user"
            },
            liked : [
                {
                    type : Mongoose.Types.ObjectId,
                    ref : "user"
                },
            ]
        }
    ],
    media : [ String ],
    sub_tasks : [{
        type : Mongoose.Types.ObjectId,
        ref : "task"
    }]
},{
    timestamps : true , versionKey : false
});

// TaskSchema.post("save", (object) => {//before save - loggin
//     console.log("POST", object);
//     logger.log({
//         level : "info",
//         message : object
//     });
// })

module.exports = Mongoose.model("task", TaskSchema)