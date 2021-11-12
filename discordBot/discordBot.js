const {discordBot, Intents, Client, Discord, MessageEmbed} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const messageCreator = require('./botUtils/messageCreator.js');
const token = process.env.BOT_DISCORD_TOKEN
const botStart = require('./catchEvent.js')
const help = `Command List:
!start -> start watching all RMRK events and those is posted in LIST e BUY channel
!test -> send message of test for check that is all ok
!help -> this
!stop -> stop bot`

const presentation = `Welcome to birdWatchingBot!
The bot captures all of Kanaria's Birds and Items in real time.
you will find two channels, one with all sales and one with all purchases.

(This is a beta version, we are working on fixing small bugs, some images will not be able to load immediately, we are working on it, speed is our first goal)`;

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
            channels.List.send(`${presentation}`)
            if(start == 0) {
                start = 1
                botStart.botStart(channels)
                channels.List.send(`BOT STARTED SUCCESFULLY`)
            }else{
                channels.List.send(`BOT IS RUNNING`)
            }
            break;
        case '!test':
            channels.List.send({embeds:[(messageCreator.buildMessage("RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANR-00000353::142500000000000"))]})
            break;
        case '!help':          
            channels.List.send(`${help}`)
            break
        case '!stop':          
            channels.List.send('Restarting...')
            process.exit()
            break
    }
})