const EventEmitter = require('events');

class CartManager extends EventEmitter {
  constructor() {
    super();
    this.cart = [];
  }

  onCreate() {
    console.log('Cart created\n');
  }

  onUpdate() {
    console.log('Cart updated\n');
    this.reportCart();
  }

  onDestroy() {
    console.log('Cart destroyed\n');
    this.calculateTotalPrice();
  }

  add(name, price, amount) {
    const item = { name, price, amount };
    this.cart.push(item);
    this.emit('update');
  }

  reportCart() {
    console.log('Cart items:');
    this.cart.forEach((item) => {
      console.log(`${item.name} - Price: $${item.price} - Amount: ${item.amount}`);
    });
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    this.cart.forEach((item) => {
      totalPrice += item.price * item.amount;
    });
    console.log(`Total Price: $${totalPrice}`);
  }
}

// Example usage
const cartManager = new CartManager();

cartManager.on('create', () => {
  cartManager.onCreate();
});

cartManager.on('update', () => {
  cartManager.onUpdate();
});

cartManager.on('destroy', () => {
  cartManager.onDestroy();
});

cartManager.emit('create');
cartManager.add('Product 1', 15.0, 2);
cartManager.add('Product 2', 5.0, 3);
cartManager.emit('destroy');
