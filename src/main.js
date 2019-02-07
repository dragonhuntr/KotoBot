//written by limit

const Discord = require('discord.js')
const Zcash = require("zcash")

const settings = require('./settings')
const Commands = require('./commands')

var emotip = require('./commands/emotip')

// Init the Discord client
const client = new Discord.Client()

const giphyApiKey = settings.GIPHY_KEY

client.on('ready', () => {
  client.user.setPresence({ status: 'online', game: { name: 'Do -koto help!' } });
  console.log('I am ready!')
})

client.on('messageReactionAdd', (reaction, user, message) => {
  console.log(reaction.emoji.id)
  if(reaction.emoji.id === '415886353063215114') {
    toAccount = reaction.message.author.username + reaction.message.author.discriminator
    account =  reaction.users.last().username + reaction.users.last().discriminator

    emotip(reaction, 0.1);
  } else if(reaction.emoji.id === '415886353121673216') {
      toAccount = reaction.message.author.username + reaction.message.author.discriminator
      account =  reaction.users.last().username + reaction.users.last().discriminator

    emotip(reaction, 1);
  } else if(reaction.emoji.id === '415886352836460547') {
      toAccount = reaction.message.author.username + reaction.message.author.discriminator
      account =  reaction.users.last().username + reaction.users.last().discriminator

    emotip(reaction, 5);
  } else if(reaction.emoji.id === '415886352861757441') {
      toAccount = reaction.message.author.username + reaction.message.author.discriminator
      account =  reaction.users.last().username + reaction.users.last().discriminator

    emotip(reaction, 10);
  } else if(reaction.emoji.id === '415886353121935360') {
      toAccount = reaction.message.author.username + reaction.message.author.discriminator
      account =  reaction.users.last().username + reaction.users.last().discriminator

    emotip(reaction, 100);
  }
})

client.on('message', message => {

  // If message has been emitted by a bot do nothing
  if (message.author.bot) return

  if (message.content.startsWith('-koto')) {
    var args = message.content.substring(1).split(' ')
    var command = args[1]

    switch (command) {
      case 'help':
        Commands.help(message)
        break
      case 'balance':
        Commands.balance(message, Zcash)
        break
      case 'address':
        Commands.address(message, Zcash)
        break
      case 'tip':
        Commands.tip(message, Zcash, args[2], args[3])
        break
      case 'withdraw':
        Commands.withdraw(message, Zcash, args[2], args[3])
        break
      default:
        message.reply('Kotoooooo')
    }
  }
})

client.login(settings.DISCORD_TOKEN)
