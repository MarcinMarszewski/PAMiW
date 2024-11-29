export class User {
	constructor(id, name, email, profile) {
	  this.id = id;
	  this.name = name;
	  this.email = email;
	  this.profile = profile;
	}
  }
  
  export class Profile {
	constructor(id, bio, userId) {
	  this.id = id;
	  this.bio = bio;
	  this.userId = userId;
	}
  }