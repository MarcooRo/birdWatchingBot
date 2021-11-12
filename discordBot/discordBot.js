const {discordBot, Intents, Client, Discord, MessageEmbed} = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const messageCreator = require('./botUtils/messageCreator.js');
const token = process.env.BOT_DISCORD_TOKEN
const botStart = require('./catchEvent.js')
bot.login("OTA3NDE0MDc2MjgyNTIzNzAw.YYm1Ng.RAkoZko32XCOAKwi9P2hEH7Bfqs")
const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')

function test(channelList, text){
    channelList.send(text)
}


bot.on("message", function(message) {
    const channelList = bot.channels.cache.find(channel => channel.id === '907415732432814101')
    const channelBuy = bot.channels.cache.find(channel => channel.id === '907415768893915237')
    let channels = {
        List: channelList,
        Buy: channelBuy
    }
    switch(message.content){
        case '!START':
            botStart.botStart(channels)
        case '!TEST':
            channels.List.send({embeds:[(messageCreator.buildMessage("RMRK::LIST::2.0.0::8949171-e0b9bdcc456a36497a-KANBIRD-KANL-00007714::3788600000000"))]})

            //sendRmrkDiscord("","","")
			//const embed = new MessageEmbed() //Ver 11.5.1 of Discord.js
            // .setColor('#0099ff')
            // .setTitle('Some title')
            // .setURL('https://discord.js.org/')
            // .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
            // .setDescription('Some description here')
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            // .addFields(
            //     { name: 'Regular field title', value: 'Some value here' },
            //     { name: '\u200B', value: '\u200B' },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            // )
            // .addField('Inline field title', 'Some value here', true)
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            // .setTimestamp()
            // .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');
            // channelList.send({ embeds: [embed] });

    }
})