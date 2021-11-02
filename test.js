const getMessageGivenFilter = require('./catchEvent/filter.js')
const sendMessage = require('./bot/sendMessage.js')
var remark = "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649::20000000000";

console.log(getMessageGivenFilter.buildMessage(remark))
sendMessage.sendMessage(1238654632,getMessageGivenFilter.buildMessage(remark))
