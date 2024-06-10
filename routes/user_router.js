var express = require('express');
var userCtrl = require('../controllers/user_controller');
var { authenticate } = require('../middlewares/authentication');
var router = express.Router();

router.get('/', authenticate, userCtrl.getAll);
router.get('/:user_id', authenticate, userCtrl.findById);
router.post('/login', userCtrl.login);
router.post('/', authenticate, userCtrl.create);
router.put('/', authenticate, userCtrl.update);
router.delete('/', authenticate, userCtrl.destroy);

module.exports = router;
