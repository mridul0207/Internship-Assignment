const User = require("../models/User");
const Blogs = require("../models/Blogs");
const { default: mongoose } = require("mongoose");

exports.getAllBlogs = async(req,res)=>{
    try{
    const id = req.user.id;
    const blogs = await User.findOne({_id:id}).populate("blogs").exec();
    return res.status(200).json({
        success:true,
        message:"Successfully retrieved all user blogs",
        blogs,
    }); 
    }
    catch(e){
        console.log("Could not retrieve the blogs");
    }
}

exports.getSingleBlog = async(req,res)=>{
    try{
        const id = req.user.id;
        let {blog_id} = req.body;
        /*blog_id =new mongoose.Types.ObjectId(blog_id);*/
        const blog = await User.findOne({_id:id}).populate('blogs');
        const singleBlog = blog.blogs.find((doc)=>doc._id.toString() === blog_id);
        /*for(let i in singleBlog){
            if(singleBlog[i]._id.toString() === blog_id)
            console.log("True");
        }*/
        return res.status(200).json({
            success:true,
            message:"Fetched Successfully",
            singleBlog
        })
    }
    catch(e){
        console.log("Error in finding single blog");
    }
}

exports.createBlog = async(req,res)=>{
    const id = req.user.id;
    const {title,desc} = req.body;
    const newBlog = await Blogs.create({title,desc});
    const updatedUser = await User.findOneAndUpdate({_id:id},{$push:{blogs:newBlog._id}},{new:true});
    return res.status(200).json({
        success:true,
        message:"Blog created and inserted",
        updatedUser
    })
}

exports.deleteBlog = async(req,res)=>{
    const id = req.user.id;
    let {blog_id} = req.body;
    blog_id =new mongoose.Types.ObjectId(blog_id);
    const updatedUser = await User.findOneAndUpdate({_id:id},{$pull:{blogs:blog_id}},{new:true});

    return res.status(200).json({
        success:true,
        message:"Blog created and inserted",
        updatedUser
    })
};

exports.updateBlog = async(req,res)=>{
    const id = req.user.id;
    const {title,desc,blog_id} = req.body;
    console.log(blog_id);
    const updatedUser = await User.findOne({_id:id}).populate('blogs');
    const singleBlog = updatedUser.blogs.find((doc)=>doc._id.toString() === blog_id);

    singleBlog.title = title;
    singleBlog.desc = desc;
    return res.status(200).json({
        success:true,
        message:"Blog created and inserted",
        singleBlog
    })
};