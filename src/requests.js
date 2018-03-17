var botch = '418393980213002252'
var hello = '400200783997698049'
var generaljp = '400107631810969611'
var generaleng = '400108763454898187'
var support = '407085776661250058'
var pool = '400247864510513153'

const request = require('request')
const { OOPS_TEXT } = require('./messages')

const RATE_URL = 'https://api.jambtc.com/api/market/ticker?mark=btc_koto'

/**
 * Give the rate of one dogecoin in euro.
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
      var aprice = obj.data;
      var high = aprice.high
      var low = aprice.low
      var buy = aprice.buy;
      console.log(price)

const embed = {
  "color": 120866,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/396346237894393858/4ba56b9b8072ab7913914e1551c14a4b.png?size=128",
    "text": "Price provided by JamBTC.com"
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
