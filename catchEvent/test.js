//1-0-0
const messageCreator = require('./scriptUtils/1-0-0/messageCreator.js');
const sendMessage = require('./scriptUtils/1-0-0/sendMessage.js');
const filterUtils = require('./scriptUtils/1-0-0/filter.js')
let pool = require('./scriptUtils/1-0-0/Db.js')
let rmrk = "RMRK::LIST::1.0.0::9851218-8ef755e9850dd2d573-🦜-KRISHNA_CHAOSBIRD46-0000000000000052::3136000000000".toString()
console.log(rmrk)

let message = messageCreator.buildMessage(rmrk)
let filter = filterUtils.prepareFilterMesage(rmrk)
// filterUtils.checkFilterMessage_User()
sendMessage.sendPhoto("1238654632",message,message.print())
