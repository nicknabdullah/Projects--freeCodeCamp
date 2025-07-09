var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const fs = require('fs');
// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file);
  const { originalname, mimetype, size } = req.file;
  res.json({ "name": originalname, "type": mimetype, "size": size });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
