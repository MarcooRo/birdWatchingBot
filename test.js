const getMessageGivenFilter = require('./catchEvent/filter.js')
const sendMessage = require('./bot/sendMessage.js')
//var remark = "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649::20000000000";
var remark = "RMRK::MINTNFT::1.0.0::%7B%22collection%22%3A%220a24c7876a892acb79-PENGUIN%22%2C%22name%22%3A%22%23202%22%2C%22instance%22%3A%22202%22%2C%22transferable%22%3A1%2C%22sn%22%3A%220000000000000202%22%2C%22metadata%22%3A%22ipfs%3A%2F%2Fipfs%2Fbafkreicnna653k7qsltxusibbj2g2cf7hs7bhgpohl7g7zkpv5byh3aeoa%22%7D";

console.log(getMessageGivenFilter.buildMessage(remark))
sendMessage.sendMessage(1238654632,getMessageGivenFilter.buildMessage(remark))
