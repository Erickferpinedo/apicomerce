import  jwt  from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"


async function login(req, res){
    const user = await User.findOne({email: req.body.email})
   if(user){
    console.log("el usuario existe")
    const match = await bcrypt.compare(req.body.password, user.password)
    if(match){
        //return res.json("te damos la bienvenida")
      const token =  jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.json({token})
    } 
   }
   return res.json("credenciales invalidadas")
} 

export default { login};