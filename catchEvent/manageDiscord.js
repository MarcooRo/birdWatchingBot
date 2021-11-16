const discordMessage = require('./scriptUtils/discordUtils/messageCreator.js')

exports.manageDiscord = function manageDiscord(remark, channel) {
    if(channel.isAlive == 1) {
        if(remark.include("LIST"))channel.getChannels().List.send(discordMessage.buildMessage(remarks).print)
        if(remark.include("BUY"))channel.getChannels().Buy.send(discordMessage.buildMessage(remarks).print)
    }
}