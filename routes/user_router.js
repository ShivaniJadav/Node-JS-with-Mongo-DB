var express = require('express');
var userCtrl = require('../controllers/user_controller');
var router = express.Router();

router.get('/', userCtrl.getAll);
router.get('/:user_id', userCtrl.findById);
router.post('/login', userCtrl.login);
router.post('/', userCtrl.create);
router.put('/', userCtrl.update);
router.delete('/', userCtrl.destroy);

module.exports = router;
