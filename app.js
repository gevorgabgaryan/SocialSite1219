const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require(`mongoose`);
const http = require('http');
require(`dotenv`).config();
const jwt=require(`jsonwebtoken`);

const indexRouter = require('./routes/IndexRouter');
const authRouter = require('./routes/AuthRouter');


//mongo connetc
mongoose.connect(process.env.mongoDbLink,{
  useNewUrlParser:true,
  useUnifiedTopology:true.valueOf,
 
},(err)=>{
   if(err) throw err;
   console.log(`connected`)
})







const app = express();


/**
 * Create HTTP server.
 */

 const server = http.createServer(app);

 //socket
const io=require("socket.io")(server);

io.use((socket,next)=>{
  try{
   if(socket.handshake.auth){
     let authToken=socket.handshake.auth.authToken;
     jwt.verify(authToken, process.env.jwtSecret,(err,decoded)=>{
       if(err) return next(err);
       socket.user={
        id: decoded.id,
        username: decoded.username,
        email:decoded.email,
       }
       next()
     })

   }
   
 }catch(err){
   console.log(51,err)
   next(err)
 }
})

io.on("connection",socket=>{
    let id=socket.user.id;
    socket.join(id);
    let onlineSet=new Set()
    for(let [, socket] of io.of("/").sockets){
        if(id==socket.user.id) continue;
        onlineSet.add(JSON.stringify(socket.user))
    } 
    //others
    socket.broadcast.emit("new online user",socket.user);
    //me
    io.to(id).emit("online users",[...onlineSet]);

      

})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports ={
  app,
  server
} 
