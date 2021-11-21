const messageCreator = require('./scriptUtils/1-0-0/messageCreator.js');
const sendMessage = require('./scriptUtils/1-0-0/sendMessage.js');
const filterUtils = require('./scriptUtils/1-0-0/filter.js')

let message = messageCreator.buildMessage('RMRK::LIST::1.0.0::10195711-0a8ce195286c168f19-DONKEY-DONKEY_GANG_039-0000000000000039::4900000000000')
let filterMessage = filterUtils.prepareFilterMesage('RMRK::LIST::1.0.0::10195711-0a8ce195286c168f19-DONKEY-DONKEY_GANG_039-0000000000000039::4900000000000')
console.log(filterUtils.checkFilterMessage_User(filterMessage,'0', "DONKEY", "DONKEY", '0'))