const amqp = require("amqplib");

class RabbitmqWrapper {
  constructor(url, queueName, options) {
    this._url = url;
    this._queueName = queueName;
    this._options = options || {};

    // public
    this.channel = undefined;
    this.queue = undefined;
  }

  async setup() {
    const connect = await amqp.connect(this._url); //mysqlconnect
    const channel = await connect.createChannel(); //mysql-database
    this.channel = channel;
  }

  async assertQueue() {
    const queue = await this.channel.assertQueue(this._queueName, {
      durable: false,
    });
    this.queue = queue;
  }

  async sendToQueue(msg) {
    const sending = await this.channel.sendToQueue(
      this._queueName,
      this.encode(msg),
      {
        persistent: true,
      }
    );
    return sending;
  }

  async recvFromQueue() {
    const message = await this.channel.get(this._queueName, {});
    if (message) {
      this.channel.ack(message);
      console.log(message.content);
      console.log(message.content.toString())
      return message.content.toString();
    } else {
      return null;
    }
  }

  encode(doc) {
    return Buffer.from(JSON.stringify(doc));
  }

  async send_message(msg) {
    await this.setup();
    await this.assertQueue();
    await this.sendToQueue(msg);
  }

  async recv_message() {
    await this.setup();
    return await this.recvFromQueue();
  }
}

module.exports = RabbitmqWrapper;