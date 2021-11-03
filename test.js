const getMessageGivenFilter = require('./catchEvent/filter.js')
const sendMessage = require('./bot/sendMessage.js')
var remark = "RMRK::LIST::2.0.0::8788599-e0b9bdcc456a36497a-KANBACK-1f388_backpack_rare-00000001::20000000000";

console.log(getMessageGivenFilter.buildMessage(remark))
sendMessage.sendMessage("1238654632", getMessageGivenFilter.buildMessage(remark))