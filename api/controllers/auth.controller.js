import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {username, email, password} = req.body;
  try {
    //HASH PSW 
    const hashedPsw = await bcrypt.hash(password,10);
    //CREATE NEW USER -> SAVE TO DB 
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPsw,
      },
    })
    res.status(201).json({message: "User created successfully"})
  } catch(err){
    console.log(err)
    res.status(500).json({message: "Error failed to create the user"})
  }
};
  
export const login = async (req, res) => {
  const {username, password } = req.body;
  try{

    // IF THE USER EXIST
    const user = await prisma.user.findUnique({
      where: {username}
    })
    if(!user) return res.status(401).json({ message: "Invalid credentials"});
    //CHECK IF THE PSW IS CORRECT WITH THE CRYPED PSW
    const isPswValid = await bcrypt.compare(password, user.password);
    if (!isPswValid) return res.status(401).json({ message: "Invalid credentials"});
    // GENERATE A COOKIE SEND IT 
    const age = 1000 * 60 * 60 * 24* 7 //A WEEK
    const token = jwt.sign({
      id: user.id,
      isAdmin: false
    },
    process.env.JWT_KEY,
    { expiresIn: age }
    ); 

    const {password:userPassword, ...userInfo} = user 
    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: true,
        maxAge: age
    })
    .status(200)
    .json(userInfo);
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Error failed to login"})
  }
};
 
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message: "Logout successfully"});
};
  