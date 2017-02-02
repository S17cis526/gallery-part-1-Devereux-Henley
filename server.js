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

function getImageNames(callback) {
	fs.readdir('images/', function(err, fileNames) {
		if(err) callback(err, undefined);
		else callback(false, fileNames);
	});
}

function imageNamesToTags(fileNames) {
	return fileNames.map((fileName) => {
		return `<img src="${fileName}" alt="${fileName}">`;
	});
}

function buildGallery(imageNames) {
	var gHtml = imageNamesToTags(imageNames);
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
	return html;
}

const server = http.createServer((req, res) => {
	switch(req.url) {
		case '/':
		case '/gallery':
			getImageNames((err, imageNames) => {
				if(err) {
					console.error(err);
					res.statusCode = 500;
					res.statusMessage = 'server error';
					res.end();
					return;
				}
				res.setHeader('Content-Type', 'text/html');
				res.end(buildGallery(imageNames));
			});	
			break;
		case '/gallery.css':
			res.setHeader('Content-Type', 'text/css');
			res.end(css);
			break;	
		default:
			serveImage(res, req.url);
	}		
});

function serveImage(res, fname) {
	fs.readFile('images' + fname, (err, body) => {
		if(err) {
			console.error(err);
			res.statusCode = 404;
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
