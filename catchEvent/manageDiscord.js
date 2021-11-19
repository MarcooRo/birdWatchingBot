const discordMessage = require('./scriptUtils/discordUtils/messageCreator.js')

exports.manageDiscord = function manageDiscord(remark, channel) {
    if(channel.isAlive() == 1) {
        if(remark.includes("LIST"))channel.getChannels().List.send(discordMessage.buildMessage(remark).print)
        if(remark.includes("BUY"))channel.getChannels().Buy.send(discordMessage.buildMessage(remark).print)
    }
}
