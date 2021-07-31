const {Router} = require('express');
const { check } = require('express-validator');
const { 
    createCategory, 
    getCategories, 
    getCategory,
    updateCategory,
    deleteCategory
    } = require('../controllers/categories');
const { categoryExist, categoryName } = require('../helpers/db-validators');
const { validateJWT, validateForm, validateAdminRole  } = require('../middlewares');

const router = Router();


/**
 * 5 servicios rest, 
 */

//Obtenas todas las categorias /*public*/
router.get('/', getCategories)

//categoria por id validacion personalizado en middleware
router.get('/:id', [
    check('id', 'Id not valid').isMongoId(), 
    check('id').custom(categoryExist),
    validateForm
    ], getCategory)

//crearcategoria por id cualquier persona con token válido
router.post('/',[
    validateJWT,
    check('name', 'Name is emtpy').not().isEmpty(),
    check('name').custom(categoryName),
    validateForm
], createCategory)

//actualizar categoria por id-cualqier con token valido
router.put('/:id',[
    validateJWT,
    check('id', 'Id Invalid').isMongoId(), 
    check('id').custom(categoryExist),
    check('name', 'Name is empty').not().isEmpty(),
    check('name').custom(categoryName),
    validateForm
], updateCategory)

//Borrar categoria -Admin
router.delete('/:id', [
    validateJWT,
    check('id', 'ID NOT VALID').isMongoId(),
    check('id').custom(categoryExist),
    validateAdminRole,
    validateForm
], deleteCategory)

module.exports = router; 