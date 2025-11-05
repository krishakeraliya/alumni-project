const crypto = require("crypto");

const User = require("../model/user-model")
const bcrypt=require("bcryptjs")
const sendEmail = require("../utils/sendEmail");
const home = async (req, res) => {
  try {
    res.status(200).send(" hello krisha welcome to backend using router again")
  } catch (error) {
    console.log(error)
  }
}
//register logic
const signup = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body

    const userExist = await User.findOne({ email }) // Check duplicate
    if (userExist) {
      return res.status(400).json({ message: "email already exist" })
    }

    //hash password valu logic userschema ma che...

    const usercreated = await User.create({ username, email, password  }) // Save new user
    res.status(201).json({
  msg: "Registration successful",
  token: await usercreated.generateToken(),
  user: {
    _id: usercreated._id,
    username: usercreated.username,
    email: usercreated.email
  }
});
  } catch (error) {
    console.error("Signup error:", error); 
    res.status(500).json("internal server error")
  }
}

//login logic 

const login=async (req,res)=>{
  try {
    const {email,password}=req.body
    const userExist=await User.findOne({email})
    if(!userExist){
      return res.status(400).json({message:"invalid"})
    }

    // const user=await bcrypt.compare(password,userExist.password);
    const user=await userExist.comparePassword(password);
    if(user){
     res.status(200).json({
  msg: "Login Succesful",
  token: await userExist.generateToken(),
  user: {
    _id: userExist._id,
    email: userExist.email,
    username: userExist.username,
     isAdmin: userExist.isAdmin
  }
});
    }else{
      res.status(401).json({message:"invalid email or password"})
    }
  } catch (error) {
      // res.status(500).json("internal server error")
      next(error)
  }
}
const user=async (req,res)=>{
   try {
    const userdata=req.user;
    console.log(user)
    return res.status(200).json({userdata})
   } catch (error) {
    console.log(error)
   }
}

//  Forgot Password (send reset link)
// Forgot Password (send reset link)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create reset token
   const resetToken = crypto.randomBytes(32).toString("hex");
const hash = crypto.createHash("sha256").update(resetToken).digest("hex");
user.resetPasswordToken = hash;
user.resetPasswordExpire = Date.now() + process.env.RESET_TOKEN_EXPIRY * 60 * 1000;
    await user.save();

    // Reset URL
const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


    // Use utility function
    await sendEmail({
      from: process.env.EMAIL_USER,   // hamesha common sender se jayega
      to: user.email,                  // user ka unique scet email
      subject: "Password Reset Request",
      html: `<p>Click here to reset your password: 
        <a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    res.status(200).json({
  success: true,
  message: `A password reset link has been sent to ${user.email}. Please check your inbox.`,
});
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//  Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hash = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hash,
      resetPasswordExpire: { $gt: Date.now() }, // not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update password
    user.password = password; // pre-save hook will hash
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { home, signup ,login,user,forgotPassword, resetPassword }
