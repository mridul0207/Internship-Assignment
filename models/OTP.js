const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5
    }
});

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`);
        console.log("Email Sent Successfully: ",mailResponse);
    }
    catch(e){
        console.log("Error occurred while sending email",e);
        throw e;
    }
}

OTPSchema.pre("save",async function(next){
    console.log("New document saved to the database");
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    };
    next();
});

module.exports = mongoose.model("OTP",OTPSchema);