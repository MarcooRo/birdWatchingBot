const messageCreator = require('./scriptUtils/1-0-0/messageCreator.js');
const sendMessage = require('./scriptUtils/1-0-0/sendMessage.js');
const filterUtils = require('./scriptUtils/1-0-0/filter.js')
const discordTest = require ('./manageDiscord.js')

let message = messageCreator.buildMessage('RMRK::LIST::2.0.0::8788590-e0b9bdcc456a36497a-KANCHEST-269b-fe0f_necklace-00001722::1567500000000')
let filterMessage = filterUtils.prepareFilterMesage('RMRK::LIST::2.0.0::8788590-e0b9bdcc456a36497a-DONKEY-269b-fe0f_necklace-00001722::1567500000000')
console.log(filterUtils.checkFilterMessage_User(filterMessage,'0', "donkey", "0", '10'))
//sendMessage.sendPhoto("1238654632",message, message.print())