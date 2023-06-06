// include the dependencies
const { convertCurrency } = require('./exchangeRateConverter.js');

const amount = 100;
const baseCurrency = 'CAD';
const targetCurrency = 'CNY';

convertCurrency(amount, baseCurrency, targetCurrency)
  .then(convertedAmount => {
    console.log(`${amount} ${baseCurrency} After exchange will be ${convertedAmount} ${targetCurrency}`);
  })
  .catch(error => {
    console.error(error.message);
  });
