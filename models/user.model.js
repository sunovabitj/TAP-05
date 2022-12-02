const { default: mongoose } = require("mongoose");

const listSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    list:[{
        title:String,
        content:String,
        createdAt: {
            type: Date,
            default: new Date(),
        },
    }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const userList = mongoose.model('userList', listSchema);

module.exports = userList;