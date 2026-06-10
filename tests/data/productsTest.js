import { products, getProduct } from '../../data/products.js';

describe('test suite: getProduct', () => {

  it('returns the correct product for a valid id', () => {
    const product = getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.priceCents).toEqual(1090);
  });

  it('returns undefined for an invalid id', () => {
    expect(getProduct('does-not-exist')).toEqual(undefined);
  });

  it('returns a product with the correct structure', () => {
    const product = getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.id).toBeDefined();
    expect(product.name).toBeDefined();
    expect(product.priceCents).toBeDefined();
    expect(product.image).toBeDefined();
    expect(product.rating).toBeDefined();
  });

});

describe('test suite: products array', () => {

  it('contains at least one product', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('every product has required fields', () => {
    products.forEach(product => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.priceCents).toBeDefined();
      expect(product.image).toBeDefined();
      expect(product.rating).toBeDefined();
    });
  });

  it('every product has a positive price', () => {
    products.forEach(product => {
      expect(product.priceCents).toBeGreaterThan(0);
    });
  });

  it('every product has a valid star rating between 0 and 5', () => {
    products.forEach(product => {
      expect(product.rating.stars).toBeGreaterThanOrEqual(0);
      expect(product.rating.stars).toBeLessThanOrEqual(5);
    });
  });

});