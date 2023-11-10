const express= require('express')
const app=express();
const mongoose=require('mongoose');
const cors= require('cors')
const userRoutes= require('./routes/userroute')
const socket = require('socket.io')
const messageRoutes= require('./routes/messagesroute');
require('dotenv').config();


app.use(cors({origin:true}))
app.use(express.json());

const dbUrl=process.env.DB_URL;
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
     console.log("DB Connetion Successfull"); 
})
.catch((err) => {
     console.log(err.message);
   });

app.use("/api/auth",userRoutes)
app.use("/api/message",messageRoutes)

const server=app.listen(process.env.PORT,()=>{
    console.log('server is running at',process.env.PORT)
})

const io= socket(server,{
     cors:{
          origin:"https://buddy-chat-project.netlify.app/",
          credentials:true,
     },
});

global.onlineUsers= new Map();
io.on("connection",(socket)=>{
     global.chatSocket =socket;
     socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
     });
     socket.on("send-msg",(data)=>{
          const sendUserSocket = onlineUsers.get(data.to);
          if(sendUserSocket){
               socket.to(sendUserSocket).emit("msg-recieve",data.message)
          }
     });
});
