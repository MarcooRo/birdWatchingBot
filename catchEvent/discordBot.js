const {discordBot, Intents, Client, Discord, MessageEmbed} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const messageCreator = require('./scriptUtils/discordUtils/messageCreator2-0-0.js');
const token = process.env.BOT_DISCORD_TOKEN
bot.login("OTA3NDE0MDc2MjgyNTIzNzAw.YYm1Ng.RAkoZko32XCOAKwi9P2hEH7Bfqs")
//const botStart = require('./catchEvent.js')
let channels;
let start = 0

exports.isAlive = function isAlive(){
    return start
}

exports.getChannels = function getChannels() {
    return channels
}

const help = `Command List:
!start -> start watching all RMRK events and those is posted in LIST e BUY channel
!test -> send message of test for check that is all ok
!help -> this
!stop -> stop bot`

const presentation = `Welcome to birdWatchingBot!
The bot captures all of Kanaria's Birds and Items in real time.
you will find two channels, one with all sales and one with all purchases.

(This is a beta version, we are working on fixing small bugs, some images will not be able to load immediately, we are working on it, speed is our first goal)`;

bot.on("message", function(message) {
    const channelList2 = bot.channels.cache.find(channel => channel.id === '907415732432814101')
    const channelBuy2 = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    const channelList1 = bot.channels.cache.find(channel => channel.id === '912012636261060658')
    const channelBuy1 = bot.channels.cache.find(channel => channel.id === '912012676157280297')
    channels = {
            List2: channelList2,
            Buy2: channelBuy2,
            List1: channelList1,
            Buy1: channelBuy1
    }

    switch(message.content) {
        case '!start':
            if(start == 0){
                start = 1
                channels.List1.send('Bot started')
            }else{
                channels.List1.send('Bot int running')
            }
            break
        case '!test':
            channels.List1.send({embeds:[(messageCreator.buildMessage("RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANR-00000353::142500000000000"))]})
            break;
        case '!help':          
            channels.List1.send(`${help}`)
            break
        case '!stop':          
            channels.List1.send('Restarting...')
            start = 0
            //process.exit()
            break
    }
})