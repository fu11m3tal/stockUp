const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "brt2jjnrh5rd6rsr6mag" // Replace this
const finnhubClient = new finnhub.DefaultApi()

exports.companyNews = (req, res) => {
  //Company News
  finnhubClient.companyNews("AAPL", "2020-01-01", "2020-05-01", (error, data, response) => {
      if (error) {
          console.error(error);
      } else {
          res.send(data)
      }
  });  
}

exports.companyProfile = (req, res) => {
  var {symbol} = req.params;
  finnhubClient.companyProfile({'isin': symbol}, (error, data, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data)
    }
  });
}

exports.stockCandles = (req, res) => {
  // Stock candles
  finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
    if (error) {
      res.send(error)
    } else {
      res.send(data)
    }
  })
}

exports.investorsOwnership = (req, res) => {
  // Investor Ownership
  let optsLimit = {'limit': 10};
  finnhubClient.investorsOwnership("AAPL", optsLimit, (error, data, response) => {
      //console.log(data)
  });
}
 
exports.investorsOwnership = (req, res) => {
  //Aggregate Indicator
  finnhubClient.aggregateIndicator("AAPL", "D", (error, data, response) => {
      //console.log(data)
  });
}
 
exports.investorsOwnership = (req, res) => {
  
}
// Basic financials
finnhubClient.companyBasicFinancials("AAPL", "margin", (error, data, response) => {
    //console.log(data)
});
 
// Company earnings
finnhubClient.companyEarnings("AAPL", {'limit': 10}, (error, data, response) => {
    //console.log(data)
});
 
// Company EPS estimates
finnhubClient.companyEpsEstimates("AAPL", {}, (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Company executive
finnhubClient.companyExecutive("AAPL", (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Company peers
finnhubClient.companyPeers("AAPL", (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Company profile
finnhubClient.companyProfile({'symbol': 'AAPL'}, (error, data, response) => {
    //console.log(data)
});


exports.investorsOwnership = (req, res) => {
  
}
finnhubClient.companyProfile({'cusip': '037833100'}, (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
//Company profile2
finnhubClient.companyProfile2({'symbol': 'AAPL'}, (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Revenue Estimates
finnhubClient.companyRevenueEstimates("AAPL", {}, (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// List country
finnhubClient.country((error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Covid-19
finnhubClient.covid19((error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Crypto candles
finnhubClient.cryptoCandles("BINANCE:BTCUSDT", "D", 1590988249, 1591852249, (error, data, response) => {
    //console.log(data)
});
 
// Crypto exchanges
finnhubClient.cryptoExchanges((error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
//Crypto symbols
finnhubClient.cryptoSymbols("BINANCE", (error, data, response) => {
    //console.log(data)
});
 
exports.investorsOwnership = (req, res) => {
  
}
// Earnings calendar
finnhubClient.earningsCalendar({"from": "2020-06-01", "to": "2020-06-30"}, (error, data, response) => {
    //console.log(data)
});
 
// Economic code
finnhubClient.economicCode((error, data, response) => {
    //console.log(data)
});
 
// Economic data
finnhubClient.economicData("MA-USA-656880", (error, data, response) => {
    //console.log(data)
});
 
// Filings
finnhubClient.filings({"symbol": "AAPL"}, (error, data, response) => {
    //console.log(data)
});
 
//Financials
finnhubClient.financials("AAPL", "ic", "annual", (error, data, response) => {
    //console.log(data)
});
 
// Financials Reported
finnhubClient.financialsReported({"symbol": "AAPL"}, (error, data, response) => {
    //console.log(data)
});
 
// Forex candles
finnhubClient.forexCandles("OANDA:EUR_USD", "D", 1590988249, 1591852249, (error, data, response) => {
    //console.log(data)
});
 
// Forex exchanges
finnhubClient.forexExchanges((error, data, response) => {
    //console.log(data)
});
 
// Forex rates
finnhubClient.forexRates({"base": "USD"}, (error, data, response) => {
    //console.log(data)
});
 
// Forex symbols
finnhubClient.forexSymbols("OANDA", (error, data, response) => {
    //console.log(data)
});
 
//Fund ownership
finnhubClient.fundOwnership("AAPL", {'limit': 10}, (error, data, response) => {
    //console.log(data)
});
 
// General news
finnhubClient.generalNews("general", {}, (error, data, response) => {
    //console.log(data)
});
 
// Ipo calendar
finnhubClient.ipoCalendar("2020-01-01", "2020-06-15", (error, data, response) => {
    //console.log(data)
});
 
//Major development
finnhubClient.majorDevelopments("AAPL", {}, (error, data, response) => {
    //console.log(data)
});
 
// News sentiment
finnhubClient.newsSentiment("AAPL", (error, data, response) => {
    //console.log(data)
});
 
// Pattern recognition
finnhubClient.patternRecognition("AAPL", "D", (error, data, response) => {
    //console.log(data)
});
 
// Price target
finnhubClient.priceTarget("AAPL", (error, data, response) => {
    //console.log(data)
});
 
//Quote
finnhubClient.quote("AAPL", (error, data, response) => {
    //console.log(data)
});
 
// Recommendation trends
finnhubClient.recommendationTrends("AAPL", (error, data, response) => {
    //console.log(data)
});
 
// Stock dividends
finnhubClient.stockDividends("KO", "2019-01-01", "2020-06-30", (error, data, response) => {
    //console.log(data)
});
 
// Splits
finnhubClient.stockSplits("AAPL", "2000-01-01", "2020-06-15", (error, data, response) => {
    //console.log(data)
});
 
// Stock symbols
finnhubClient.stockSymbols("US", (error, data, response) => {
    //console.log(data)
});
 
// Support resistance
finnhubClient.supportResistance("AAPL", "D", (error, data, response) => {
    //console.log(data)
});
 
// Technical indicator
finnhubClient.technicalIndicator("AAPL", "D", 1580988249, 1591852249, "macd", {}, (error, data, response) => {
    //console.log(data)
});
 
// Transcripts
finnhubClient.transcripts("AAPL", (error, data, response) => {
    console.log(data)
});
 
// Transcripts list
finnhubClient.transcriptsList("AAPL", (error, data, response) => {
    console.log(data)
});
 
// Upgrade/downgrade
finnhubClient.upgradeDowngrade({"symbol": "AAPL"}, (error, data, response) => {
    //console.log(data)
});
 
// Tick Data
finnhubClient.stockTick("AAPL", "2020-03-25", 500, 0, (error, data, response) => {
    // console.error(data);
});