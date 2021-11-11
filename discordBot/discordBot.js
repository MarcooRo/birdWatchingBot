const {discordBot, Intents, Client, Discord, MessageAttachment} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.BOT_DISCORD_TOKEN
bot.login("OTA3NDE0MDc2MjgyNTIzNzAw.YYm1Ng.RAkoZko32XCOAKwi9P2hEH7Bfqs")
const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')


bot.on("message", function(message) {
    const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
    const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    switch(message.content){
        case '!START':
            //sendRmrkDiscord("","","")
			const attach = new MessageAttachment('https://i.imgur.com/DabI2Cq.png')
			message.channel.send(`https://i.imgur.com/DabI2Cq.png ciao ciao`, attach)

    }
})