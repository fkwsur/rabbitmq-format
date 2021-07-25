const express = require("express");
const app = express();
const cors = require("cors");
const mq = require("./rabbitmq-api");
const db = require('./model'); 
const {chatting} = require("./model/chatting");
const Rabbitmq = require('./rabbitmq')
const dotenv = require('dotenv');
const { Console } = require("console");
const { PORT  } = process.env;
const url = "amqp://localhost";
const queue = "web_msg";
dotenv.config();
const http_server = require('http')
.createServer(app)
.listen(PORT || 8081, () => {
  console.log('server on');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/send_msg", mq.send_message);
app.get("/get_msg", mq.recv_message);

db.sequelize
.authenticate()
.then(async () => {
  try{
    console.log('db connect ok');
    await db.sequelize.sync({force : false});
  }catch(err){
    console.log('err');
  }  
})
.catch(err => {
    console.log('db' + err);
});

app.post('/test', async (req, res) => {
  try{
    let { msg } = req.body;
    const rows = await db.chatting.create({
      chatting : msg
    })
    
    return res.status(200).json({result : "dbtrue"}); 
  }catch(err){
    if(err.name.includes('SequelizeDatabaseError')) {
      let {msg} = req.body
      const conn = new Rabbitmq(url, queue);    
      await conn.send_message(msg);
      res.status(200).json({ result: "mqtrue" });
    }
    /*
   
      */
  }
})