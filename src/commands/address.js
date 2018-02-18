const { OOPS_TEXT } = require('../messages')

const ADDRESS_TEXT = ', **This is your Koto address!** : '

const nouser = 'User not found, creating an address'

const test = 'You arent meant to view this message, contact Limit#1844!'

const addr = ''

var multilevel = require('multilevel')
var levelup = require('levelup')
var leveldown = require('leveldown')
var net = require('net')

const db = levelup(leveldown('./addr'))

var fs = require('fs');

var Zcash = require("zcash");

var rpc = new Zcash({
        username: “insert-rpc-username-here”,
        password: “insert-rpc-password-here”,
        port: "8432"
})

net.createServer(function (con) {
  con.pipe(multilevel.server(db)).pipe(con);
}).listen(3000);

function address (message, dogecoinNode) {
  var account = message.author.tag.replace('#', '');
  var address = address;

  // Will create a new account if doesn't exist... ? Should we allow this ?
  // Yes
  db.get(account, function (err) {
    if (err) {
      console.log(err)
      if (err.notFound) {
        message.channel.send({embed: {
          color: 3447003,
          description: "User not found, creating an address for you :D"
        }});
        rpc.getnewaddress().then(address => {
            message.channel.send(message.author.toString() + ADDRESS_TEXT + address)
            db.put(account, address, function(err) {
              console.log(account);
              console.log(address);
                       })
                     })
                   }
                 }
    else {
      db.get(account, function(err, address) {
              message.channel.send(message.author.toString() + ADDRESS_TEXT + address)
          if (err) {
            if (err.notFound) {
              message.channel.send(test)
                  }
                }
              })
            }
    })
}

module.exports = address
