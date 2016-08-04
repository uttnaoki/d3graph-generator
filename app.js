var express = require('express');
var app = express();

var db = require('./utils/database');
db.create_table_csv();
db.create_table_user();
db.create_table_id_map();

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'jade');

var multer = require('multer');

var storage = multer.memoryStorage({
    destination: 'public/csv'
});

var upload = multer({ storage: storage });

var routes = {
    index  : require('./routes/index')
};

app.get('/', routes.index.index);

app.post('/public/csv/bar', upload.single('bar_chart'), function (req, res) {
    var data = req.file.buffer.toString();
    console.log('reveived data\n', data);
    insert_uploaded(data);
    res.render('bar.jade');
});

function insert_uploaded(data) {
    db.insert_csv(data, 'bar', function(last_id) {
        db.insert_id_map(last_id, 'guest1')
    });
}

app.post('/public/csv/circle', upload.single('circle_chart'), function (req, res) {
    console.log(req.file);

    res.render('circle.jade');
});

app.listen(3000, function () {
    console.log("port 3000 ...")
});
