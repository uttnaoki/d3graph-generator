var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'jade');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/csv',
    filename: function(req, file, cb) {
        cb(null, "bar_chart.csv")
    }
});
var upload = multer({ storage: storage });

var routes = {
    index  : require('./routes/index')
};

app.get('/', routes.index.index);

app.post('/public/csv', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file);
    res.render('bar', { title: 'Express Sample Posted ver 0.0.1', word: req.body.word});
});

app.listen(3000, function () {
    console.log("port 3000 ...")
});
