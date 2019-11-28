var express = require('express');
var bodyParser = require('body-parser');
var app = express()
var cors = require('cors');
var mysql = require('mysql');
var config = require('./config.json')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(cors());

var mysql = require('mysql');

function connect(){
	con = mysql.createConnection(config.database);
	con.connect(function(err){
		if(err){
			console.log("Error when connection to db:", err);
			setTimeout(handleDisconnect, 5000);
		}
	});
	
	con.on("error", function(err){
		console.log("DB Error", err);
		if(err.code == "PROTOCOL_CONNECTION_LOST"){
			connect();
		} else {
			throw err;
		}
	});
}

app.post('/', function(req, res){
    console.log(req.body);
    let id = generateId(5);

    const sql = "INSERT INTO urls (url, code) VALUES ?";
    var values = [
        [req.body.url, id],
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Result: ", result);
        res.status(200).send({ id });
    });
});

app.get('/:id', function(req, res){
    console.log(req.params.id);
    const sql = "SELECT url FROM urls WHERE code = ?";
    con.query(sql, [req.params.id], function (err, result) {
        if(err) throw err;
        if (result.length > 0) {
            console.log("Result: ", result[0].url);
            res.status(200).send({ url: result[0].url });
        } else {
            res.sendStatus(400);
        }
    });
});

connect();
app.listen(3001);
console.log("Server Started");

function generateId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }