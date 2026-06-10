import renderPaymentSummary from '../../scripts/checkout/paymentSummary.js';
import { loadFromStorage } from '../../data/cart.js';

describe('test suite: renderPaymentSummary', () => {

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML =
      '<div class="js-payment-summary"></div>';

    renderPaymentSummary();
  });

  it('renders the payment summary', () => {
    expect(
      document.querySelector('.js-payment-summary').innerHTML
    ).not.toEqual('');
  });

  it('displays the correct item quantity', () => {
    // productId1 quantity 2 + productId2 quantity 1 = 3
    expect(
      document.querySelector('.js-payment-summary').innerText
    ).toContain('Items (3)');
  });

  it('displays the correct shipping price', () => {
    // deliveryOption 1 = FREE ($0), deliveryOption 2 = $4.99
    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$4.99');
  });

  it('displays the correct order total', () => {
    // productId1: $10.90 x 2 = $21.80
    // productId2: $20.95 x 1 = $20.95
    // subtotal = $42.75
    // shipping = $4.99
    // total before tax = $47.74
    // tax 10% = $4.77
    // total = $52.51
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$52.51');
  });

  it('displays 0 shipping for free delivery option', () => {
    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1' // FREE shipping
      }]);
    });

    loadFromStorage();
    renderPaymentSummary();

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$0.00');
  });

  it('displays correct total for empty cart', () => {
    localStorage.getItem.and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    renderPaymentSummary();

    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$0.00');
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

});