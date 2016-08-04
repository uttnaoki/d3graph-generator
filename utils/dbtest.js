// testing
var database = require('./database.js');
database.create_table_csv();
database.create_table_user();

database.insert_user('bar', 'pass');
database.insert_csv('1, 2, 3', 'circle', function (fileid) {
    console.log(fileid)
});
database.insert_csv('1, 2, 3', 'circle', function (fileid) {
    console.log(fileid)
});

// database.drop_table_user();
// database.drop_table_csv();

database.close_db();
