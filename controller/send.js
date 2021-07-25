const rebbitmq = require('../rabbitmq');

module.exports = {

  Send : async (req, res) => {
    try{
      let {msg} = req.body;
      rebbitmq.rebbitSend(msg);
      res.send(msg);
    }catch(err){
      console.log(err);
    }
  }

}