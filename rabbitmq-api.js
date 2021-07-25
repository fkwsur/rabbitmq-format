const Rabbitmq = require("./rabbitmq");
const db = require('./model'); 
const {chatting} = require("./model/chatting");
const url = "amqp://localhost"; //rabbitmq url
const queue = "web_msg"; //임시 queue이름이고 필요한 상황에 맞게 이름 따로 지정해줘야 한다.
module.exports = {
  send_message: async (req, res) => {
    try {
      let { msg } = req.body;
      const conn = new Rabbitmq(url, queue);

      await conn.send_message(msg);
      res.status(200).json({ result: true });
    } catch (error) {
      console.log(error);
    }
  },
  recv_message: async (req, res) => {
    try {
      const conn = new Rabbitmq(url, queue);
      const msg = await conn.recv_message();
      res.status(200).json({ result: msg });
    } catch (error) {}
  },
  test : async (req, res) => {
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
    }
  }

};