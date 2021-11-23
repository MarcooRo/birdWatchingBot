const messageCreator = require('./scriptUtils/2-0-0/messageCreator.js');
const sendMessage = require('./scriptUtils/2-0-0/sendMessage.js');
const filterUtils = require('./scriptUtils/2-0-0/filter.js')
const discordTest = require ('./manageDiscord.js')
let rmrk = 'RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANR-00000353::142500000000000';
let message = messageCreator.buildMessage(rmrk)
let filterMessage = filterUtils.prepareFilterMesage(rmrk)
console.log(filterUtils.checkFilterMessage_User(filterMessage,'000000000000', '0'))
sendMessage.sendPhoto("1238654632",message, message.print())