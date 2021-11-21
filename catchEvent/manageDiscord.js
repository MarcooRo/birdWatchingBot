const discordMessage = require('./scriptUtils/discordUtils/messageCreator.js')

exports.manageDiscord = function manageDiscord(remark, channel) {
    if(channel.isAlive() == 1) {
        
        if(remark.includes("2.0.0")) {
            if(remark.includes("LIST"))channel.getChannels().List2.send(({embeds:[discordMessage.buildMessage(remark)]}))
            if(remark.includes("BUY"))channel.getChannels().Buy2.send({embeds:[discordMessage.buildMessage(remark)]})
        }

        if(remark.includes("1.0.0")) {
            if(remark.includes("LIST"))channel.getChannels().List1.send(({embeds:[discordMessage.buildMessage(remark)]}))
            if(remark.includes("BUY"))channel.getChannels().Buy1.send({embeds:[discordMessage.buildMessage(remark)]})
        }
    }
}