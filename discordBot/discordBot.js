const {discordBot, Intents, Client, Discord, MessageEmbed} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const messageCreator = require('./botUtils/messageCreator.js');
const token = process.env.BOT_DISCORD_TOKEN
const botStart = require('./catchEvent.js')


bot.login("OTA3NDE0MDc2MjgyNTIzNzAw.YYm1Ng.RAkoZko32XCOAKwi9P2hEH7Bfqs")
let start = 0

bot.on("message", function(message) {
    const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
    const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    let channels = {
        List: channelList,
        Buy: channelBuy
    }
    switch(message.content) {
        case '!start':
            if(start == 0) {
                start = 1
                botStart.botStart(channels)
            }else{
                console.log(`bot is arleady started`)
            }
            break;
        case '!test':
            channels.List.send({embeds:[(messageCreator.buildMessage("RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANR-00000353::142500000000000"))]})
            break;
        case '!stop':          
            channels.List.send('Resetting...')
            process.exit()
            break
    }
})