export default class Calculator {
	number1: number;
	number2: number;
	constructor(number1 : string, number2 : string) {
	  this.number1 = parseFloat(number1);
	  this.number2 = parseFloat(number2);
	}
  
	// Metoda dodająca dwie liczby
	add() {
	  return this.number1 + this.number2;
	}
  }