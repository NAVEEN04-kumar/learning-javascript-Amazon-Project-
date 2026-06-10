import { cart } from '../../data/cart-class.js';

//flakyTest-test somethime pass or fails
//unit test
//we have to do complex test an integration test meaning test many units or pices of code working together
describe('test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadFromStorage;
  });

  it('add existing product to the cart', () => {

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(2);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');

  });

  it('add the new product to the cart', () => {

    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([]);
    });

    cart.loadFromStorage;

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');

  });

  it('adds the correct quantity from the quantity selector', () => {

    document.querySelector('.js-test-container').innerHTML =
      '<select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">' +
      '<option value="3" selected>3</option>' +
      '</select>';

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItem[0].quantity).toEqual(4);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    document.querySelector('.js-test-container').innerHTML = '';
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadFromStorage;
  });

  it('removes a product from the cart', () => {

    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItem.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
  });

  it('does nothing if product is not in the cart', () => {

    cart.removeFromCart('does-not-exist');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
});

describe('test suite: calculateCartQuantity', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 4,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 3,
          deliveryOptionId: '2'
        }]);
    });

    cart.loadFromStorage;
  });

  it('return total quantity of all item in the cart', () => {
    expect(cart.calculateCartQuantity()).toEqual(7);
  });

  it('return the correct quantity when the cart has only one item', () => {

    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadFromStorage;

    expect(cart.calculateCartQuantity()).toEqual(2);
  });

  it('return 0 when the cart is empty', () => {

    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([]);
    });

    cart.loadFromStorage;

    expect(cart.calculateCartQuantity()).toEqual(0);
  });
});

describe('test suite: updateQuantity', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadFromStorage;
  });

  it('updates the cart quantity', () => {

    cart.updateQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 4);

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(4);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 4,
      deliveryOptionId: '1'
    }]));
  });

  it('does nothing if the product is not in the cart', () => {

    cart.updateQuantity('does-not-exist', 4);

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the quantity is not mentioned properly', () => {

    cart.updateQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

});

describe('test suite: updateDeliveryOPtion', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadFromStorage;
  });

  it('updates the delivery option', () => {

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '3'
    }]));
  });

  it('does nothing if the product is not in the cart', () => {

    cart.updateDeliveryOption('does-not-exist', '3');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the delivery option does not exist', () => {

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');

    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItem[0].quantity).toEqual(1);
    expect(cart.cartItem[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });
});


