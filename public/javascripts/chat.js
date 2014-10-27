(function() {

  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  }

  ChatApp.Chat = function(socket) {
    this.socket = socket;
  };

  ChatApp.Chat.prototype.sendMessage = function(message) {
    this.socket.emit("message", {message: message});
  };


})();