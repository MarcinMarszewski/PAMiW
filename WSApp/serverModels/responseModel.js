class Response {
    constructor(type, room = '', username = '', text = '', messages = []) {
        this.type = type;
        this.room = room;
        this.username = username;
        this.text = text;
        this.messages = messages;
      }
  }
  
  module.exports = Response;