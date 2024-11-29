export class Order {
	id;
	userName;
	productIds;
	constructor(id, user, products) {
	  this.id = id;
	  this.userName = user;
	  this.products = products;
	}
  }