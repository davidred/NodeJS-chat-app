

function createChat (server) {
  var io = require('socket.io')(server);
  var guestNumber = 1;
  var nicknames = {};

  io.on('connection', function(socket) {
    var userName = 'user' + guestNumber;
    nicknames[socket.id] = userName;
    guestNumber += 1;
    socket.emit("startup", {
      message: "new socket connected:" + socket.id,
      defaultName: userName,
    });

    socket.on("message", function(data) {
      if (data.message.slice(0,5) === "/nick") {
        console.log("running command");
        var newName = data.message.slice(5);
        nicknames[socket.id] = newName;
        socket.emit("changeName", newName);
      } else {
        socket.emit("message", data);
      }
    });
  });
};

exports.createChat = createChat;