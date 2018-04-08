var botch = '418393980213002252'
var hello = '400200783997698049'
var generaljp = '400107631810969611'
var generaleng = '400108763454898187'
var support = '407085776661250058'
var pool = '400247864510513153'

const request = require('request')
const { OOPS_TEXT } = require('./messages')

const RATE_URL = 'https://exvo.io/api/v2/tickers/kotobtc.json'

/**
 * Give the rate of one Koto in BTC.
 * @return rate
 **/
function price(client, message) {
  return new Promise((resolve, reject) => {
    request.get(RATE_URL, function (error, response, body) {
      if (error) {
        reject(OOPS_TEXT)
        return
      }
      var obj = JSON.parse(body);
      var aprice = obj.ticker;
      var high = aprice.high
      var low = aprice.low
      var buy = aprice.buy;
      console.log(price)

const embed = {
  "color": 120866,
  "footer": {
    "icon_url": "https://exvo.io/logo64.png",
    "text": "Price provided by Exvo.io"
  },
  "fields": [
    {
      "name": "1 KOTO/BTC",
      "value": "\u200b"
    },
    {
      "name": "HIGH:",
      "value": high
    },
    {
      "name": "LOW:",
      "value": low
    },
    {
      "name": "BUY:",
      "value": buy
    }
  ]
};
if (message.channel.id == hello || message.channel.id == generaljp  || message.channel.id == generaleng  || message.channel.id == support  || message.channel.id == pool) {
  client.channels.get('418393980213002252').send({ embed })
      }
else {
  message.channel.send({ embed })
      }
    })
  })
}

module.exports = price
