const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRouter=require('./routes/userRoutes')
const bodyParser = require('body-parser')
const skillRouter=require('./routes/skillRoutes')
const resouceRouter = require('./routes/resourceRouter')
app=express();

var cors=require('cors')
app.use(cors())

const logger=require('./middleware/logger') 
//app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//app.use(logger)


app.use('/user',userRouter);
app.use('/skill',skillRouter);
app.use('/resource',resouceRouter);

app.use((req,res,next)=>{
  const error = new Error('not found');
  error.status=404;
  next(error);
})

app.use((error,req,res,next)=>{
   
   if(error.status){
    res.status(501).json({
      message:error.message
    })
   }
   else{
     res.status(500).json({
       message:error.message
     })
   }
})

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
  }
});

let users={}
io.on("connection", (socket) => { 
  
   socket.on('new_user',data=>{
      users[data.sender]=socket.id
      console.log(users)
   })
   socket.on("new_message",data=>{
     console.log(data.reciever)
      let socketid=users[data.reciever]
      io.to(socketid).emit("new_message",data);
   })
});



mongoose.connect('mongodb://localhost/E-Ally', {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('database connected')
})


httpServer.listen(4000,(req,res)=>{
    console.log('port listening on 4000')
})