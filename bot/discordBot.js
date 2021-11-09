const {discordBot, Intents, Client} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.BOT_DISCORD_TOKEN
bot.login("OTA3NDE0MDc2MjgyNTIzNzAw.YYm1Ng.RAkoZko32XCOAKwi9P2hEH7Bfqs")

bot.on("message", function(message) {
    const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
    const channeBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    switch(message.content){
        case '!test':
            channelList.send("My Bot's message", {files: ["https://i.imgur.com/removed.png"]});

    }
})