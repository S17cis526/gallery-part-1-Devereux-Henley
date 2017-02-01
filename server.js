'use strict';

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */

const http = require('http');
const port = 3449;

const fs = require('fs');

const css = fs.readFileSync('gallery.css');
const imageNames = [
	'ace',
	'chess',
	'fern',
	'bubble',
	'mobile']
const server = http.createServer((req, res) => {
	switch(req.url) {
		case '/gallery':
			var gHtml = imageNames.map((fname) => {
				return '<img src="' + fname + '" alt="oops">'
			}).join(' ');
			var html = '<!doctype html>'
				html += '<head>'
				html += '<title>Dynamic Page</title>'
				html += '<link href="gallery.css" rel="stylesheet" type="text/css">'
				html += '</head>'
				html += '<body>'
				html += '<h1>Gallery</h1>'
				html += gHtml
				html += '<h1>Hello.</h1> Time is ' + Date.now()
				html += '</body>'
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
			break;
		case '/gallery.css':
			res.setHeader('Content-Type', 'text/css');
			res.end(css);
			break;
		case '/chess':
			goodResponse(res, 'chess.jpg');
			break;
		case '/ace':
			goodResponse(res, 'ace.jpg');
			break;
		case '/bubble':
			goodResponse(res, 'bubble.jpg');
			break;
		case '/fern':
			goodResponse(res, 'fern.jpg');
			break;
		case '/mobile':
			goodResponse(res, 'mobile.jpg');
			break;
		default:
			res.statusCode = 404;
			res.statusMessage = 'Not found';
			res.end();
	}		
});

function goodResponse(res, fname) {
	fs.readFile('images/' + fname, (err, body) => {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = 'oops';
			res.end('Ya dun messed up Aaron.');
			return;
		}
		else{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'image/jpeg');
			res.end(body);
		}
	});	
}

server.listen(port, () => {
	console.log('Listening on Port ' + port);
});
