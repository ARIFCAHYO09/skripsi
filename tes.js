const express = require('express');
const mysql = require('mysql');
const app = express();
const conntodb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MasCahyo135',
  database: 'sig'
});

let sql = "SELECT * FROM node";
let sqllok = "SELECT * FROM lokasi";
let sqljl = "SELECT * FROM jalan";
conntodb.query(sql, (err, results) => {
	if(err) throw err;
	//for(i=0;i<results.length;i++) {
	//	vertex[vertex.length]={id : results[i].id, x :results[i].x, y : results[i].y, block : results[i].block, jalan : results[i].jalan};
	//}
	vertex=results;
	conntodb.query(sqllok, (err, results) => {
		lokasik=results;
		conntodb.query(sqljl, (err, results) => {
			ways=results;
			console.log(ways);
			});
		});
});
