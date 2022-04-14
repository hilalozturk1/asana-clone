const Mongoose = require("mongoose");//con. mongodb

const db = Mongoose.connection;

db.once("open", () => {
    console.log("successful db con")
});

const connectDB = async () => {
    await Mongoose.connect("mongodb://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_NAME, {//
        useNewUrlParser: true,
        useUNifiedTopology: true
    });
};
module.exports = {
    connectDB
}