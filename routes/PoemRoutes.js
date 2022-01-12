const poem= require('../controller/PoemControllers');
const user= require('../controller/AuthCotrollers');
const express= require('express');

const router= express.Router();

router.route('/').get(poem.GetPoems).post(user.Protect,poem.PostPoem);
router.route('/:id').get(poem.GetPoem).delete(user.Protect,poem.DeletePoem);
router.route('/best/dt').get(poem.BestPoem)
module.exports=router;