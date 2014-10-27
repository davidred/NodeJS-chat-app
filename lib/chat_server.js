

function createChat (server) {
  var io = require('socket.io')(server);
  var guestNumber = 1;
  var nicknames = {};

  function checkName(socketID, username) {
    for (var prop in nicknames) {
      if (nicknames[prop] === username) {
        return true;
      }
    }
    return false;
  };

  io.on('connection', function(socket) {
    var that = this;
    var userName = 'user' + guestNumber;
    nicknames[socket.id] = userName;
    guestNumber += 1;
    socket.emit("startup", {
      message: "new socket connected:" + socket.id,
      defaultName: userName,
    });

    socket.on("message", function(data) {
      socket.emit("message", data);
    });

    socket.on("nicknameChangeRequest", function(data) {
      debugger
      if (that.checkName(socket.id, data.newName)) {
        console.log(data);
        nicknames[socket.id] = data.newName;
        socket.emit("nicknameChangeResponse", {
          success: false,
          message: "Username already exists",
        });
      } else {
        socket.emit("nicknameChangeResponse", {
          success: true,
          message: data.newName,
        });
      }
    });
  });
};

exports.createChat = createChat;