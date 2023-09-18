const mongoose = require('mongoose');
const blogsSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    desc:{
        required:true,
        type:String
    }
})

module.exports = mongoose.model("Blogs",blogsSchema);