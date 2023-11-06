// Create web server
// Run: node comments.js
// View at: http://localhost:8081/comments.html

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [
  { name: 'Bob', message: 'Hello everyone!' },
  { name: 'Jane', message: 'Goodbye!' }
];

var server = http.createServer(function (request, response) {
  var urlObj = url.parse(request.url);
  var path = urlObj.pathname;
  if (path === '/') {
    fs.readFile('comments.html', function (err, data) {
      if (err) {
        response.statusCode = 500;
        response.end('Server error!');
      } else {
        response.end(data);
      }
    });
  } else if (path === '/comments') {
    if (request.method === 'GET') {
      response.end(JSON.stringify(comments));
    } else if (request.method === 'POST') {
      var body = '';
      request.on('data', function (data) {
        body += data;
      });
      request.on('end', function () {
        var comment = querystring.parse(body);
        comments.push(comment);
        response.end(JSON.stringify(comment));
      });
    }
  } else {
    response.statusCode = 404;
    response.end('Page not found!');
  }
});

server.listen(8081, function () {
  console.log('Server running at http://localhost:8081/');
});