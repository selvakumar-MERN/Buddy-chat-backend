const userdata= require('../controllers/usercontroller')

const router= require('express').Router();

router.post('/login',userdata.Login)
router.post('/verifylogin',userdata.verifyLogin)
router.post('/register',userdata.Register)
router.post('/setavatar/:id',userdata.setavatar)
router.get('/alluser/:id',userdata.getalluser)

module.exports= router;