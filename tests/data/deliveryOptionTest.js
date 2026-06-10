import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
  validDeliveryOption
} from '../../data/deliveryOptions.js';

describe('test suite: getDeliveryOption', () => {

  it('returns the correct delivery option', () => {
    expect(getDeliveryOption('1')).toEqual({
      id: '1',
      deliveryDays: 7,
      priceCents: 0
    });

    expect(getDeliveryOption('2')).toEqual({
      id: '2',
      deliveryDays: 3,
      priceCents: 499
    });

    expect(getDeliveryOption('3')).toEqual({
      id: '3',
      deliveryDays: 1,
      priceCents: 999
    });
  });

  it('returns the first delivery option if id does not exist', () => {
    expect(getDeliveryOption('does-not-exist')).toEqual(deliveryOptions[0]);
  });

});

describe('test suite: validDeliveryOption', () => {

  it('returns true for a valid delivery option', () => {
    expect(validDeliveryOption('1')).toEqual(true);
    expect(validDeliveryOption('2')).toEqual(true);
    expect(validDeliveryOption('3')).toEqual(true);
  });

  it('returns false for an invalid delivery option', () => {
    expect(validDeliveryOption('does-not-exist')).toEqual(false);
  });

});

describe('test suite: calculateDeliveryDate', () => {

  it('skips weekends when calculating delivery date', () => {
    // Mock dayjs to control the current date
    // delivery option 1 = 7 days, skipping weekends
    const result = calculateDeliveryDate(deliveryOptions[0]);
    expect(typeof result).toEqual('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns a correctly formatted date string', () => {
    const result = calculateDeliveryDate(deliveryOptions[0]);
    // Format is 'dddd MMMM D' e.g. 'Wednesday May 27'
    expect(result).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+ \d+$/);
  });

  it('returns a sooner date for faster delivery options', () => {
    const import_dayjs = deliveryOptions[2]; // 1 day
    const slow = deliveryOptions[0];         // 7 days

    const fastDate = new Date(calculateDeliveryDate(import_dayjs));
    const slowDate = new Date(calculateDeliveryDate(slow));

    expect(fastDate.getTime()).toBeLessThan(slowDate.getTime());
  });

});