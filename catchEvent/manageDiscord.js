const discordMessage2 = require('./scriptUtils/discordUtils/messageCreator2-0-0.js')
const discordMessage1 = require('./scriptUtils/discordUtils/messageCreator1-0-0.js')

exports.manageDiscord = function manageDiscord(remark, channel) {
    if(channel.isAlive() == 1) {
        if(remark.includes("2.0.0")) {
            if(remark.includes("LIST"))channel.getChannels().List2.send(({embeds:[discordMessage2.buildMessage(remark)]}))
            if(remark.includes("BUY"))channel.getChannels().Buy2.send({embeds:[discordMessage2.buildMessage(remark)]})
        }

        if(remark.includes("1.0.0")) {
            if(remark.includes("LIST"))channel.getChannels().List1.send(({embeds:[discordMessage1.buildMessage(remark)]}))
            if(remark.includes("BUY"))channel.getChannels().Buy1.send({embeds:[discordMessage1.buildMessage(remark)]})
        }
    }
}