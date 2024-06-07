const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const uploads = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb("only png and jpeg formats are allowed!", false);
        }
    },
    limits: {
        files: 1,
        fieldSize: 1024 * 1024 * 2
    }
})

module.exports = {
    uploads
}