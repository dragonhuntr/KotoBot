

const embed = {
  "color": 4772300,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/406998854488162304/d4b698c614b3f9c40be8c3ce58853167.png?size=128",
    "text": "Made by Limit#1844, Version 0.1"
  },
  "thumbnail": {
    "url": "https://cdn.discordapp.com/avatars/406998854488162304/d4b698c614b3f9c40be8c3ce58853167.png?size=128"
  },
  "fields": [
    {
      "name": "KotoBot Help",
      "value": "**-koto help** | Display this message."
    },
    {
      "name": "-=-=-=-=-=-=-",
      "value": "**-koto address** | Get a Koto address."
    },
    {
      "name": "-=-=-=-=-=-=-",
      "value": "**-koto balance** | Get your wallet's balance."
    },
    {
      "name": "-=-=-=-=-=-=-",
      "value": "**-koto withdraw** ``amount`` ``address`` | Withdraw your Koto balance."
    }
  ]
};

function help (message) {
message.channel.send({ embed });
}

module.exports = help
