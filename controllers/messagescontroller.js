const messages= require('../model/messagemodel')

const addmessage= async(req,res)=>{
   try{
           const{from,to,message}= req.body;
           const data= await messages.create({
            message:{text:message},
            users:[from,to],
            sender: from,
           })
           return res.status(200).send("Message added sucessfully")
   }
   catch(error){
    res.status(400).send(error)
   }
}

const getmessage = async(req,res)=>{
    const{from,to}=req.body;
    try{

        
        const message= await messages.find({users:{$all:[from,to]}}).sort({ updatedAt: 1 });
    
        const usermessage= message.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()=== from,
                message:msg.message.text,
            }
        })
        res.status(200).send(usermessage)
    }
    catch(error){
     res.status(400).send(error)
    }
}

module.exports.addmessage=addmessage;
module.exports.getmessage=getmessage