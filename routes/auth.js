const {Router} = require('express');

const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateForm } = require('../middlewares/validate-form');
const router = Router();


router.post('/login',[
    check('email', 'Enter the email').isEmail(),
    check('password', 'Enter the password').not().isEmpty(),
    validateForm
], login);


module.exports = router; 