const Discord = require('discord.js')
const client = new Discord.Client()

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

const rpcLogin = 'kotosan';
const rpcPassword = 'tekitou';
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

function emotip(reaction, amount) {
    
  var amountInt = amount;

  var qaccount = reaction.users.last().toString()

  var amountInt = parseFloat(amountInt).toFixed(8);
  console.log(amountInt)
  console.log(toAccount)
  console.log(account)
  db.get(account, function(err, address) {
    var gaddress = addr + address
    console.log(gaddress)
    post('z_getbalance', [gaddress], function(err, data) {
        if (err != null) {
            console.log('Error: ' + err.message);
            return;
        }
  db.get(toAccount, function(err, address) {
    var haddress = addr + address
    if (haddress == '' + 'undefined') {
      reaction.message.channel.send(qaccount + ', User specified not found.')
      return;
    }
    if (haddress == gaddress) {
      reaction.message.channel.send(qaccount + ', You cannot tip yourself!')
    }
    console.log(haddress)
      if (data.result >= amountInt) {
        if (data.result >= amountInt - threshold - txFee) {
          console.log(data.result >= amountInt - threshold - txFee)
          var amount = data.result - txFee;
            console.log(amountInt)
            var bal = amount - amountInt;
            bal = bal.toFixed(8)
            console.log('Transfer', amountInt, 'from', gaddress, 'to', haddress);
            post('z_sendmany', [gaddress, [{ address: haddress, amount: amountInt }, { address: gaddress, amount: bal }]], function(err, data) {
                if (err != null) {
                    console.log('Error: ' + err.message);
                    reaction.message.channel.send('ERROR, please contact Limit#1844')
                } else {
                    console.log(data)
                    console.log('Sent', amountInt, 'to', haddress);
                    reaction.message.channel.send(qaccount + ', Sent **' + amountInt + '** Koto to ``' + haddress + '``')
                    reaction.message.channel.send('Your balance should update once the transaction gets confirmed.')
                }
            });
        } else {
            console.log('Balance', data.result, 'is below threshold');
            reaction.message.channel.send(qaccount + 'Your tipping amount is below the threshold of **0.1** Koto. Please raise the amount.');
              }
            }
        else {
           console.log ('Not enough balance')
           reaction.message.channel.send(qaccount + ', You do not have enough balance');
              }
            });
          })
        })
}
module.exports = emotip
