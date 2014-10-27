(function() {

  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  }

  ChatApp.Chat = function(socket) {
    this.socket = socket;
  };

  ChatApp.Chat.prototype.sendMessage = function(data) {
    console.log(data);
    if (data.slice(0,5) === "/nick") {
      var newName = data.slice(5);
      this.socket.emit("nicknameChangeRequest", {newName: newName});
    } else {
      this.socket.emit("message", {message: data});
    }
  };


})();