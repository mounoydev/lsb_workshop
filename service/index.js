var express = require('express');
var mysql   = require('mysql');
var app = express();
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
});

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


connection.connect();
app.get('/phonebook/dep', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query("SELECT * FROM phonebook.dep;", function(err, rows) {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    });
});
app.get('/phonebook/updatedep', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('replace into phonebook.dep (id,depname,fullname) VALUES (\''+req.query.depid+'\',\''+req.query.name+'\',\''+req.query.fullname+'\')', function(err, result) {
        if (err) throw err;
        console.log(result.changedRows.toString());
        res.send(result.changedRows.toString());
    });
});
app.get('/phonebook/viewuser/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query("SELECT phonebook.myusers.*,phonebook.dep.fullname FROM phonebook.myusers,phonebook.dep where phonebook.myusers.dept=phonebook.dep.id and  dept="+req.params.id, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    });
});
//http://localhost:3000/phonebook/createuser?name=beer&surname=vongphukdee&gender=%E0%BA%8D&positon=admin&division=dddd&depid=5&phone=7771eeee
app.get('/phonebook/createuser', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(result.insertId);
    connection.query("INSERT INTO `phonebook`.`myusers` VALUES ('', '"+req.query.name+"', '"+req.query.surname+"', '"+req.query.gender+"', '"+req.query.position+"', '"+req.query.division+"', '"+req.query.depid+"', '"+req.query.phone+"'); ", function(err, result) {
        if (err) throw err;
        res.send(result.insertId.toString());
        console.log(result.insertId);
    });
});
app.get('/phonebook/updateuser', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');

   var query = connection.query("UPDATE phonebook.myusers  SET name='"+req.query.name+"',surname='"+req.query.surname+"',gender='"+req.query.gender+"',position='"+req.query.position+"', division='"+req.query.division+"',dept="+req.query.depid+",Tel='"+req.query.phone+"' where id="+req.query.id+";", function(err,result) {
        if (err) throw err;
        res.send(result.changedRows.toString());
       console.log('changed ' + result.changedRows + ' rows');
    });
    console.log(query.sql);
});
app.get('/phonebook/deleteuser', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var query = connection.query("DELETE FROM phonebook.myusers WHERE id="+req.query.id+";", function(err,result) {
        if (err) throw err;
        res.send(result.changedRows.toString());
        console.log('changed ' + result.changedRows + ' rows');
    });
    console.log(query.sql);
});


app.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(req.query.test);
});
app.post('/profile', upload.array(), function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    res.json(req.body);
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//connection.end();