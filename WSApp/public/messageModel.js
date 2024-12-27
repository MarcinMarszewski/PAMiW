class Message {
    constructor(type, room, username, text = '') {
      this.type = type;
      this.room = room;
      this.username = username;
      this.text = text;
    }
  }
  
  export default Message;