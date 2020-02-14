'use strict';

module.exports = function(Product) {
/**
 * Return true if input is larger then zero
 * @param {number} quantity Number to validate
 */
const validQuantity = quantity => Boolean(quantity > 0);

/**
 * Buy this product
 * @param {number} quantity Number of products to buy
 * @param {Function(Error, object)} callback
 */

Product.prototype.buy = function(quantity, callback) {
    if(!validQuantity(quantity)){
        return callback(`Invalid quantity ${quantity}`);
    }
    var result = {
        status: `You baught ${quantity} product(s)`,
    };
    callback(null, result);
  };

  Product.validatesLengthOf('name', {
    min: 3,
    message: 'Name should be at least 3 characters',
  });

  Product.validatesUniquenessOf('name');

  const positiveInteger = /^[0-9]*$/;

  const validatePositiveInteger = function(err) {
      if(!positiveInteger.test(this.price)) {
          err();
      }
  }

  Product.validate('price', validatePositiveInteger, {
      message: 'Price should be a positive integer',
  });

  function validateMinimalPrice(err, done) {
      const price = this.price;

      process.nextTick(() => {
          const minimalPriceFromDB = 3
          if(price < minimalPriceFromDB) {
              err();
          }
          done();
      });

  }
  Product.validateAsync('price', validateMinimalPrice, {
      message: 'Price should be bigger then minimal price in the database'
  });

};
