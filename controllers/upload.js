const multer = require('multer');
const storage = multer.memoryStorage(); // In-memory storage, you can customize this based on your needs
const maxSize = 1024 * 1024 * 5; // 5 MB (adjust as needed)

var upload = multer({
    dest: 'upload/'
});
var upload = upload.single('recfile');

module.exports = {
    upload,
    maxSize
}