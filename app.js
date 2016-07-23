var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/html'));
var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

var routes = {
    index  : require('./routes/index')
};

app.get('/', routes.index.index);
app.post('/upload', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file)
});
app.listen(3000, function () {
    console.log("die")
});
