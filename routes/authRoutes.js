const express =require ('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController')
const authMiddelware = require('../middlewares/authMiddelware')
const router =express.Router()
//Register|| Post
router.post('/reg',registerController)
//Login ||Post
router.post('/login',loginController)
//get current user ||get
// router.get('/current-user',authMiddelware,currentUserController)
module.exports = router