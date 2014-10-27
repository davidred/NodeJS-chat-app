(function() {
  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  }

  var socket = io();
  var ChatUI = ChatApp.ChatUI = function(socket) {
    this.socket = socket;
    this.bindListeners();
  };

  ChatUI.prototype.bindListeners = function() {
    that = this;
    $('.message-input').on('submit', function(event) {
      event.preventDefault();
      that.send();
    });

    this.socket.on("startup", function (data) {
      console.log(data)
      that.userName = data.defaultName;
    });

    this.socket.on("message", function(data) {
      that.display(data.message);
    });

    this.socket.on("changeName", function(newName) {
      that.userName = newName;
    });
  };

  ChatUI.prototype.getInput = function() {
    return $('.message-input > input').val();
  };

  ChatUI.prototype.send = function() {
    var c = new ChatApp.Chat(this.socket);
    c.sendMessage(this.getInput());
  };

  ChatUI.prototype.display = function(message) {
    var content = this.userName + ": " + message
    $('.message-display').html(content);
  };

})();