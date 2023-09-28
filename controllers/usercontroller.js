const user = require('../model/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Register=  async (req,res,next)=>{
    try{
       const {username,email,password}= req.body;
       const usernamecheck= await user.findOne({"username":username})
       if(usernamecheck){
        return res.status(400).send("username already exist")
       }
       const emailcheck = await user.findOne({"email":email})
       if(emailcheck){
        return res.status(400).send("email already exist")
       }
       const hashedpass= await bcrypt.hash(password,10);
       const User= await user.create({
        email,
        username,
        password:hashedpass,
       })
      res.status(200).send("Registeration succsfull please LOGIN")
    }
    catch(ex){
       next(ex)
    }
}


const Login=  async (req,res,next)=>{
    try{
       const {username,password}= req.body;
       const usernamecheck= await user.findOne({"username":username})
       if(!usernamecheck){
        return res.status(400).send("Incorrect username or password")
       }
       const passwordValid= await bcrypt.compare(password,usernamecheck.password)
       if(!passwordValid){
           return res.status(400).send("Incorrect username or password")
       }
       const token = jwt.sign({ email: usernamecheck.email }, process.env.TOKEN_SECRET);
       res.header("auth_token", token).send({token:token});
    }
    catch(ex){
       next(ex)
    }
}


const verifyLogin = async (req, res) => {
    
    const { token } = req.body
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        if (verify) {
            await user.findOne({ email: verify.email })
                .then((res) =>res.toJSON()) 
                .then((data)=>{
                    
                    res.status(200).send(data)
                })

        }

    }
    catch {
        res.status(400).send('Invalid token')
    }
}

const setavatar= async(req,res)=>{
    try{
         const userid= req.params.id;
         const avatarImage = req.body.image;
         const data= await user.findByIdAndUpdate(userid,{
            isAvatarImageSet:true,
            avatarImage:avatarImage,
         })
         res.status(200).send("Avatar setted sucessfully")
    }
    catch(error){
        res.status(400).send("Error setting avatar. Please try again")
    }
}

const getalluser= async(req,res)=>{
         try{
              const find = await user.find({_id:{$ne: req.params.id}}).select([
                "email",
                "username",
                "avatarImage",
                "_id",
              ]);
              res.status(200).send(find)
         }
         catch(error){
            res.status(400).send(error)
         }
}

module.exports.verifyLogin=verifyLogin;
module.exports.getalluser=getalluser;
module.exports.setavatar=setavatar;
module.exports.Login=Login;
module.exports.Register=Register;