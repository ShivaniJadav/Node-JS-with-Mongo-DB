var express = require('express');
var categoryCtrl = require('../controllers/category_controller');
var router = express.Router();
var { uploads } =  require('../middlewares/file_upload')
var { authenticate } = require('../middlewares/authentication');

router.get('/', authenticate, categoryCtrl.getAll);
router.get('/:category_id', authenticate, categoryCtrl.findById);
router.post('/', uploads.single('photo'), authenticate, categoryCtrl.create);
router.put('/', uploads.single('photo'), authenticate, categoryCtrl.update);
router.delete('/', authenticate, categoryCtrl.destroy);

module.exports = router;
