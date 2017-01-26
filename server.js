"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */

const http = require('http');
const port = 3449;

const fs = require('fs');

const server = http.createServer((req, res) => {
	switch(req.url) {
		case "/chess":
			goodResponse(res, 'chess.jpg');
			break;
		case "/ace":
			goodResponse(res, 'ace.jpg');
			break;
		case "/bubble":
			goodResponse(res, 'bubble.jpg');
			break;
		case "/fern":
			goodResponse(res, 'fern.jpg');
			break;
		case "/mobile":
			goodResponse(res, 'mobile.jpg');
			break;
		default:
			res.statusCode = 404;
			res.statusMessage = "Not found";
			res.end();
	}		
});

function goodResponse(res, fname) {
	fs.readFile('images/' + fname, (err, body) => {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = "oops";
			res.end("Ya dun messed up Aaron.");
			return;
		}
		else{
			res.statusCode = 200;
			res.setHeader("Content-Type", "image/jpeg");
			res.end(body);
		}
	});	
}

server.listen(port, () => {
	console.log("Listening on Port " + port);
});
