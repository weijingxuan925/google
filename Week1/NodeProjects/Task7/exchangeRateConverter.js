// requriement: for axios for http request
const axios = require('axios');

// async function for getting exchange rate
async function getExchangeRate(baseCurrency, targetCurrency) {
  try {
    // the api for getting exchange rate
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    const rates = response.data.rates;
    const exchangeRate = rates[targetCurrency];

    if (exchangeRate!=null) {
      return exchangeRate;
    } 
    else {
      throw new Error(`cannot get the ${targetCurrency} exchange rate`);
    }
  } 
  // catch the error and throw a new error
  catch (error) {
    throw new Error('to getExchangeRate failed');
  }
}

async function convertCurrency(amount, baseCurrency, targetCurrency) {
  try {
    const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);
    const convertedAmount = amount * exchangeRate;
    return convertedAmount;
  } 
  catch (error) {
    throw new Error(`unable ${error.message}`);
  }
}

// export the module as task2
module.exports = {
  convertCurrency
};
