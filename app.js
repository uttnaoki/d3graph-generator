var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'jade');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/csv',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "csv")
    }
});
var upload = multer({ storage: storage });

var routes = {
    index  : require('./routes/index')
};

app.get('/', routes.index.index);

app.post('/public/csv/bar', upload.single('bar_chart'), function (req, res) {
    console.log(req.file);
    res.render('bar.jade');
});

app.post('/public/csv/circle', upload.single('circle_chart'), function (req, res) {
    console.log(req.file);
    res.render('circle.jade');
});

app.listen(3000, function () {
    console.log("port 3000 ...")
});
