const {discordBot, Intents, Client} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.BOT_DISCORD_TOKEN
bot.login("OTA3NDE0MDc2MjgyNTIzNzAw.YYm1Ng.RAkoZko32XCOAKwi9P2hEH7Bfqs")


exports.sendRmrkDiscord = function sendRmrkDiscord(msg, photo, type){
    bot.channels.cache.get(`907415732432814101`).send(`Text`)
    // const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101').clien
    // const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    // channelList.send("My Bot's message", {files: ["https://i.imgur.com/removed.png"]});
    
}

bot.on("message", function(message) {
    const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
    const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    switch(message.content){
        case '!test':
            channelList.send("My Bot's message", {files: ["https://i.imgur.com/removed.png"]});

    }
})