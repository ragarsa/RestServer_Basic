const {Router} = require('express');

const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateForm } = require('../middlewares/validate-form');
const router = Router();


router.post('/login',[
    check('email', 'Enter the email').isEmail(),
    check('password', 'Enter the password').not().isEmpty(),
    validateForm
], login);

router.post('/google',[
    check('id_token', 'The token is necessary').not().isEmpty(),
    validateForm
], googleSignIn);


module.exports = router; 