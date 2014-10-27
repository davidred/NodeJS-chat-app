var cs = require('./chat_server');

var http = require('http'),
  static = require('node-static');

var file = new static.Server('./public');

var server = http.createServer(function (req, res) {
  // res.writeHead(200, {"Content-Type": "text/plain"});
  // res.write('hello');
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume();
  // res.end();
});

server.listen(8000);
console.log("server started");

cs.createChat(server);
console.log("chat server started");