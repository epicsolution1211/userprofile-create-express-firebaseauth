const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');

const validateUser = require("./middleware/auth.middleware");
const { upload, maxSize } = require('./controllers/upload');

const {
  createProfile
} = require("./controllers/auth");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/upload', upload, (req, res) => {
  // Handle the uploaded file
  var tmp_path = String(req.file.path);

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function () { res.json({ avatar: req.file.filename }); });
  src.on('error', function (err) { res.json({ err: 'no success' }); });
});

app.post("/create-profile", validateUser, createProfile);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});