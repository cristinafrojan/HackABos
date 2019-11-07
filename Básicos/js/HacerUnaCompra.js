'use strict';

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.cart = [];
  }
  addItemToCart(item) {
    if (this.cart.length === 0) {
      this.cart.push({ item: item, amount: 1 });
      return;
    }
    let found = false;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item.name === item.name) {
        this.cart[i].amount++;
        found = true;
      }
    }
    if (!found) {
      this.cart.push({ item: item, amount: 1 });
    }
  }
}

class Shop {
  static checkout(user) {
    console.log('Article | Units | Price | Total');
    let toPay = 0;
    for (let i = 0; i < user.cart.length; i++) {
      toPay += user.cart[i].amount * user.cart[i].item.price;
      console.log(
        user.cart[i].item.name +
          ' | ' +
          user.cart[i].amount +
          ' | ' +
          user.cart[i].item.price +
          '€ | ' +
          user.cart[i].amount * user.cart[i].item.price +
          '€'
      );
    }
    console.log('TOTAL ' + toPay + '€');
  }
}

const shoe = new Item('Shoe', 95.5);
const hat = new Item('Hat', 39.95);
const glasses = new Item('Glasses', 149.95);

const pepe = new User('Pepe');

pepe.addItemToCart(hat);
pepe.addItemToCart(shoe);
pepe.addItemToCart(shoe);
pepe.addItemToCart(glasses);
console.log(pepe.cart);
Shop.checkout(pepe);
