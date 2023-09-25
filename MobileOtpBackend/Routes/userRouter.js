const router=require('express').Router();
const{signUp,verifyotp}=require('../Controllers/userController')

router.route('/signup')
    .post(signUp);

router.route('/signup/verify')
    .post(verifyotp);
    
module.exports=router;