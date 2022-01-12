const express= require('express');
const User= require('../controller/AuthCotrollers');
const reviwe= require('../controller/RateControllers');

const router= express.Router();

router.route('/:id').post(User.Protect,reviwe.postRate);

module.exports=router;