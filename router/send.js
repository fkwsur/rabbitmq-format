const router = require('express').Router();
const { sendController : controller } = require('../controller');

router.post('/send', controller.Send); 

module.exports = router;