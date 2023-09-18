const express = require('express');
const router = express.Router();

const {sendOTP,signUp,login} = require('../controllers/Auth');
const {getAllBlogs,getSingleBlog,createBlog,deleteBlog,updateBlog} = require('../controllers/CRUD');
const {auth} = require('../middlewares/auth');
router.post("/otp",sendOTP);
router.post("/signUp",signUp);
router.post("/login",login);

router.get("/getAllBlogs",auth,getAllBlogs);
router.post("/getSingleBlog",auth,getSingleBlog);
router.put("/createBlog",auth,createBlog);
router.delete("/deleteBlog",auth,deleteBlog);
router.put("/updateBlog",auth,updateBlog);
module.exports = router;