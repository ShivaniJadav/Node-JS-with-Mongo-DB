var express = require('express');
var categoryCtrl = require('../controllers/category_controller');
var router = express.Router();
var { uploads } =  require('../middlewares/file_upload')

router.get('/', categoryCtrl.getAll);
router.get('/:category_id', categoryCtrl.findById);
router.post('/', uploads.single('photo'), categoryCtrl.create);
router.put('/', uploads.single('photo'), categoryCtrl.update);
router.delete('/', categoryCtrl.destroy);

module.exports = router;
