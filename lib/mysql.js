'use strict'

const mysql  = require('mysql');

module.exports = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "Bill_System"
});
