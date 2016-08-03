var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

var drop_table_user = function () {
    db.serialize(function() {
        db.run('DROP TABLE user');
    })
};

var drop_table_csv = function () {
    db.serialize(function() {
        db.run('DROP TABLE csv');
    })
};

var create_table_user = function () {
    db.serialize(function() {
        db.run('CREATE TABLE user (username TEXT, pass TEXT)');
    })
};

var create_table_csv = function () {
  db.serialize(function() {
    db.run('CREATE TABLE csv (data TEXT, g_type TEXT)');
  })
};

var insert_user = function (username, pass) {
    db.serialize(function() {
        db.run('INSERT INTO user VALUES (?, ?)', username, pass);
    })
};

var insert_csv = function (csv, g_type) {
    db.serialize(function() {
        db.run('INSERT INTO csv VALUES (?, ?)', csv, g_type);
    })
};

var close_db = function () {
    db.close();
};

// create_table_csv();
insert_user('bar', 'pass');
insert_csv('1, 2, 3', 'circle');
close_db();
// drop_table_user();
// drop_table_csv();
