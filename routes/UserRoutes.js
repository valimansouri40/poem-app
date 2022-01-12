const express= require('express');
const User= require('../controller/AuthCotrollers');

const router= express.Router();

router.route('/sineup').post(User.Sineup)
router.route('/login').post(User.log)
router.route('/logout').post(User.Logout)
router.route('/getme').get(User.Protect,User.GetMe)

module.exports=router;