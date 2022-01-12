const express= require('express');
const User= require('../controller/AuthCotrollers');
const reviwe= require('../controller/ReviweControlers');

const router= express.Router();

router.route('/').post(User.Protect,reviwe.postMessage);
router.route('/:id').get(User.Protect,reviwe.getMessage).delete(User.Protect,reviwe.deleteMessage);

module.exports= router;