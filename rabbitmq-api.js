const Rabbitmq = require("./rabbitmq");
const url = "amqp://localhost";
const queue = "web_msg";
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
};