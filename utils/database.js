var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

exports.drop_table_user = function() {
    db.serialize(function() {
        db.run('DROP TABLE user');
    })
};

exports.drop_table_csv = function() {
    db.serialize(function() {
        db.run('DROP TABLE csv');
    })
};

exports.create_table_user = function(){
    db.serialize(function() {
        db.run('CREATE TABLE  user (_id Integer PRIMARY KEY AUTOINCREMENT, username TEXT, pass TEXT)');
    })
};

exports.create_table_csv = function() {
  db.serialize(function() {
    db.run('CREATE TABLE csv (_id Integer PRIMARY KEY AUTOINCREMENT, data TEXT, g_type TEXT)');
  })
};

exports.create_table_id_map = function() {
    db.serialize(function() {
        db.run('CREATE TABLE id_map (_id Integer PRIMARY KEY AUTOINCREMENT, file_id TEXT, user_id TEXT)');
    })
};

exports.insert_id_map = function(fileid, userid) {
    db.serialize(function() {
        db.run('INSERT INTO id_map (file_id, user_id) VALUES (?, ?)', fileid, userid)
    });
};

// returns file_id
exports.insert_csv = function(csv, g_type, cb) {
    db.serialize(function() {
        db.run('INSERT INTO csv (data, g_type) VALUES (?, ?)', csv, g_type, function(err) {
            if (err) {
                console.log(err.tostring())
            } else {
                cb(this.lastid)
            }
        });
    });
};

exports.insert_user = function(username, pass) {
    db.serialize(function() {
        db.run('INSERT INTO user (username, pass) VALUES (?, ?)', username, pass);
    })
};

exports.select_csv = function(file_id, cb) {
    db.serialize(function() {
        db.run('SELECT data, g_type FROM csv where _id = ?', file_id, function (data) {
            cb(data)
        });
    })
};

exports.select_user = function() {
    db.serialize(function() {
        db.run('SELECT user, pass FROM user');
    })
};

exports.close_db = function(){
    db.close();
};
