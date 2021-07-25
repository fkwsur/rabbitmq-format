const rebbitmq = require('../rabbitmq');

module.exports = {

  Receive : async (req,res) => {
    try{
      let {msg} = req.body;
      rebbitmq.rebbitReceive(msg);
      res.send(msg);
    } catch(err){
      console.log(err);
    }
  }

}