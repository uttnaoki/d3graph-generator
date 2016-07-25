var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/'));
var multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/bar_chart/csv',
    filename: function(req, file, cb) {
        cb(null, "bar_chart.csv")
    }
});
var upload = multer({ storage: storage });

var routes = {
    index  : require('./routes/index')
};

app.get('/', routes.index.index);
app.post('/public/bar_chart/csv', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file)

});
app.listen(3000, function () {
    console.log("port 3000 ...")
});
