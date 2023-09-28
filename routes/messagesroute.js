const messagedata= require('../controllers/messagescontroller')

const router= require('express').Router();

router.post('/addmessage',messagedata.addmessage)
router.post('/getmessage',messagedata.getmessage)


module.exports= router;