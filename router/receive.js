const router = require('express').Router();
const { receiveController : controller } = require('../controller');

router.post('/receive', controller.Receive); 

module.exports = router;
