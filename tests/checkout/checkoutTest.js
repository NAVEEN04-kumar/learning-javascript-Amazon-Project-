import renderCheckoutHeader from '../../scripts/checkout/checkoutHeader.js';
import { cart } from '../../data/cart-class.js';

describe('test suite: renderCheckoutHeader', () => {

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 3,
        deliveryOptionId: '2'
      }]);
    });

    cart.loadFromStorage;

    document.querySelector('.js-test-container').innerHTML =
      '<div class="js-checkout-header"></div>';

    renderCheckoutHeader();
  });

  it('renders the checkout header', () => {
    expect(
      document.querySelector('.js-checkout-header').innerHTML
    ).not.toEqual('');
  });

  it('displays the correct cart quantity', () => {
    expect(
      document.querySelector('.js-return-to-home-link').innerText
    ).toEqual('5'); // 2 + 3
  });

  it('updates quantity when cart changes', () => {
    spyOn(localStorage, 'setItem');

    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart.loadFromStorage;
    renderCheckoutHeader();

    expect(
      document.querySelector('.js-return-to-home-link').innerText
    ).toEqual('1');
  });

  it('displays 0 when cart is empty', () => {
    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([]);
    });

    cart.loadFromStorage;
    renderCheckoutHeader();

    expect(
      document.querySelector('.js-return-to-home-link').innerText
    ).toEqual('0');
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

});