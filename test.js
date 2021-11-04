const getMessageGivenFilter = require('./catchEvent/scriptUtils/filter.js')
const sendMessage = require('./catchEvent/scriptUtils/sendMessage.js')
var remark = "RMRK::LIST::2.0.0::8788594-e0b9bdcc456a36497a-KANCHEST-2b55_necklace-00002207::2185000000000";

// console.log(getMessageGivenFilter.buildMessage(remark))
// sendMessage.sendMessage("1238654632", getMessageGivenFilter.buildMessage(remark))
sendMessage.sendPhoto("1238654632", getMessageGivenFilter.buildMessage(remark).imgSRC, getMessageGivenFilter.buildMessage(remark).print())