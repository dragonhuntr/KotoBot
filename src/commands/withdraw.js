var botch = '418393980213002252'
var hello = '400200783997698049'
var generaljp = '400107631810969611'
var generaleng = '400108763454898187'
var support = '407085776661250058'
var pool = '400247864510513153'

const { OOPS_TEXT } = require('../messages')

const WITHDRAW_TEXT = 'Successful withdrawal.'
const PROPER_AMOUNT_TEXT = 'You need to provide the amount of Koto to send.'
const NO_COMMA_TEXT = 'Please use "." instead of ",".'
const NEED_ADDRESS_TEXT = 'Please specify a Koto t-address as your third argument.'
const NO_FUNDS = 'You do not have any Koto in your wallet, please add Koto using the address provided in **-koto address**.'
const NOT_ENOUGH_FUNDS = 'You do not have enough Koto to send, please do **-koto address** to check your balance.'

var multilevel = require('multilevel')
var levelup = require('levelup')
var leveldown = require('leveldown')
var net = require('net')

var db = multilevel.client();
var con = net.connect(3000);
con.pipe(db.createRpcStream()).pipe(con);

var addr = ''
var test = 'test'

var Zcash = require("zcash");

const http = require('http');

const rpcLogin = 'rpclogin';
const rpcPassword = 'pw';
const rpcHost = '127.0.0.1';
const rpcPort = 8432;

const txFee = 0.0001;

const threshold = 0.1;

// Make HTTP POST
function post(method, params, callback) {
    var body = JSON.stringify({ method: method, params: params })
    var options = {
        port: rpcPort,
        hostname: rpcHost,
        auth: rpcLogin + ':' + rpcPassword,
        method: 'POST',
        path: '/',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (body) {
            if (callback != null) {
                callback(null, JSON.parse(body));
            }
        });
    });
    req.on('error', function(err) {
        callback(err, null);
    });
    req.write(body);
    req.end('\n');
};

// Execute RPC z_sendmany
function withdraw (client, message, Zcash, amount, toAddress) {
  var amountInt = parseFloat(amount).toFixed(8);
  if (!amount) {
    message.reply(PROPER_AMOUNT_TEXT)
    return
  }

  // If amount has a comma
  if (amount.indexOf(',') >= 0) {
    message.reply(NO_COMMA_TEXT)
    return
  }

  if (!toAddress) {
    message.reply(NEED_ADDRESS_TEXT)
    return
  }

  var account = message.author.tag.replace('#', '')

  db.get(account, function(err, address) {
    var gaddress = addr + address
    console.log(gaddress)
    post('z_getbalance', [gaddress], function(err, data) {
      console.log(err)
        if (err != null) {
            console.log('Error: ' + err);
            message.channel.send('' + err)
            return;
        }
        if (toAddress === gaddress) {
          if (message.channel.id == hello || message.channel.id == generaljp  || message.channel.id == generaleng  || message.channel.id == support  || message.channel.id == pool) {
            client.channels.get('418393980213002252').send(message.author.toString() + ', You cannot withdraw to the same address!')
           }
          else {
            message.channel.send(message.author.toString() + ', You cannot withdraw to the same address!')
          }
          return;
}
      if (data.result >= (threshold - txFee)) {
            console.log(data.result)
            var amount = data.result - txFee;
            console.log(amount)
            var bal = amountInt - amount;
            bal = parseFloat(bal).toFixed(8);
            console.log(bal)
            console.log('Transfer', amountInt, 'from', gaddress, 'to', toAddress);
            post('z_sendmany', [gaddress, [{ address: toAddress, amount: amountInt }, { address: gaddress, amount: bal }]], function(err, data) {
                if (data.error.code == '-8' && data.error.code) {
                  message.reply('Invalid transaction!')
                  return
}
                else if (data.error.code == '-3' && data.error.code) {
                  message.reply('transaction error please contact limit')
                  console.log(data.error)
                  return
  }
                if (err == null) {
                    console.log('Sent', amountInt, 'to', toAddress);
                    if (message.channel.id == hello || message.channel.id == generaljp  || message.channel.id == generaleng  || message.channel.id == support  || message.channel.id == pool) {
                      client.channels.get('418393980213002252').send(message.author.toString() + ', Sent **' +  amountInt + '** Koto to ``' +  toAddress + '``')
                      client.channels.get('418393980213002252').send('Your balance should update once the transaction gets confirmed.')
                    }
                    else {
                      message.channel.send(message.author.toString() + ', Sent **' +  amountInt + '** Koto to ``' +  toAddress + '``')
                      message.channel.send('Your balance should update once the transaction gets confirmed.')
                   }
                } else {
                    console.log('Error' + err);
        client.channels.get('418393980213002252').send(message.author.toString() + ' ERROR, please contact Limit#1844 ' + err)
                }
            });
        } else {
            console.log('Balance', data.result, 'is below threshold');
            if (message.channel.id == hello || message.channel.id == generaljp  || message.channel.id == generaleng  || message.channel.id == support  || message.channel.id == pool) {
              client.channels.get('418393980213002252').send(message.author.toString() + ', You do not have enough balance');
              }
            else {
             message.channel.send(message.author.toString() + ', You do not have enough balance');
             }
        }
    });
  })
}

module.exports = withdraw
