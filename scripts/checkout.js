import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import renderCheckoutHeader from './checkout/checkoutHeader.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart-class.js';

// import '../data/backend-practice.js';
// import '../data/cart-class.js';
// import '../data/car.js';

async function loadPage() {
  try {
    //throw 'error1';
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      //throw 'error2';
      loadCart(() => {
        //reject('error 3');
        resolve();
      });
    });

  } catch (error) {
    console.log('unexpected error:', error);
  }
  
  renderOrderSummary();
  renderCheckoutHeader();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

*/

/*
new Promise((resolve) => {
  loadProducts(() => {
      resolve('value1');
    });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
