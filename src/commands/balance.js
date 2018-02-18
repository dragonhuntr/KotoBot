const { OOPS_TEXT } = require('../messages')
const Zcash = require("zcash")

var multilevel = require('multilevel')
var levelup = require('levelup')
var leveldown = require('leveldown') 
var net = require('net')

const addr = ''

var db = multilevel.client();
var con = net.connect(3000);
con.pipe(db.createRpcStream()).pipe(con);

const rpc = new Zcash({
        username: "rpcuser",
        password: "pass",
  port: "8432"
});

function balance (message, dogecoinNode) {
  var account = message.author.tag.replace('#', '')

    db.get(account, function (err) {
    if (err) {
      console.log(err)
      if (err.notFound) {
        message.channel.send({embed: {
          color: 3447003,
          description: "Wallet not found, please do **-koto address** to get your wallet!"
        }});
      }
    }
    else {
      db.get(account, function(err, address) {
      rpc.z_getbalance(addr + address).then(balance => {
          if (balance = '') {
            console.log(balance)
            console.log(addr + address)
            message.channel.send(message.author.toString() + ', You have **0** Koto.')
         }
          else {
            rpc.z_getbalance(addr + address).then(balance => {
              message.channel.send(message.author.toString() + ', You have **' + balance + '** Koto.')
              db.put(account, address, balance, function(err) {
                console.log(account);
                console.log(address);
                console.log(balance);
              })
            })
          }
        })
      })
    }
  })
}

module.exports = balance
