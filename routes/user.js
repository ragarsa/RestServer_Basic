const {Router} = require('express');

const { check } = require('express-validator');

const { getUser, 
        postUser, 
        putUser, 
        patchUser, 
        deleteUser } = require('../controllers/user');

const { validateForm } = require('../middlewares/validate-form');
const { validRole, existEmail, existID } = require('../helpers/db-validators');

const router = Router(); 

router.get('/', getUser);

router.post('/', [
        check('name', 'Type your name').not().isEmpty(), 
        check('password', 'The password must be 6 characters').isLength({min:6}), 
        check('email', 'Email is invalid').isEmail(), 
        check('email').custom(existEmail), 
        // check('role', 'Role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(validRole),
        validateForm
], postUser);

router.put('/:id',[
        check('id', 'It is not id valid').isMongoId(),
        check('id').custom(existID),
        check('role').custom(validRole),
        validateForm
],putUser);

router.patch('/', patchUser);

router.delete('/:id',[
        check('id', 'It is not id valid').isMongoId(),
        check('id').custom(existID),
        validateForm
], deleteUser);

module.exports = router;
