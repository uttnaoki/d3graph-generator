var express = require('express');
var app = express();

var db = require('./utils/database');
// db.create_table_csv();
// db.create_table_user();
// db.create_table_id_map();

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'jade');

var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: 'public/csv',
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + ".csv")
//     }
// });

var storage = multer.memoryStorage({
    // destination: 'public/csv'
});

var upload = multer({ storage: storage });

var routes = {
    index  : require('./routes/index')
};

app.get('/', routes.index.index);

app.post('/virtual/bar', upload.single('bar_chart'), function (req, res) {
    var data = req.file.buffer.toString();
    console.log('received data\n', data);
    // insert_uploaded(data);
    res.render('bar.jade', {value: data});
});

app.post('/virtual/circle', upload.single('circle_chart'), function (req, res) {
    console.log(req.file);
    var data = req.file.buffer.toString();
    res.render('circle.jade', {value: data});
});

function insert_uploaded(data) {
    db.insert_csv(data, 'bar', function(last_id) {
        db.insert_id_map(last_id, 'guest1')
    });
}
port = process.env.PORT||8000;
app.listen(port, function () {
    console.log(port, "...")
});
