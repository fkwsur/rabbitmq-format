const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./model'); 
const mq = require("./rabbitmq-api");
const dotenv = require('dotenv');
const { PORT  } = process.env;
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
app.post("/test", mq.test);

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