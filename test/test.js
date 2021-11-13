const message = require('../catchEvent/scriptUtils/messageCreator.js')
const XMLHttpRequest = require('xhr2');
const sendMessage = require('../catchEvent/scriptUtils/sendMessage.js')
const https = require('https');
const { request } = require('http');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const d = new Date();
let time = d.getTime();
let filterUtils = require('../catchEvent/scriptUtils/filter')
let n = Math.floor(Math.random() * (time * 1000))
// const prepareImg = require('../catchEvent/scriptUtils/prepareImage.js')
const testALl = require('./testAll.json')

//esempio di immagien finita
//ipfs://ipfs/QmQMLMjx55DqbsLRF48kt8c1XTqCJWxvLhF4jQBhnaaz1e/substrapunk/substrapunk_foreground_thumb.png
//https://gateway.pinata.cloud/ipfs/QmQMLMjx55DqbsLRF48kt8c1XTqCJWxvLhF4jQBhnaaz1e/substrapunk/substrapunk_foreground_thumb.png

let url = 'https://kanaria.rmrk.app/api/rmrk2/nft/8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615'

var remark = "RMRK::LIST::2.0.0::9807302-e0b9bdcc456a36497a-EVNTS-HNTDTR-00000008::950000000000000";

let message1 = message.buildMessage(remark)
console.log(message1.reamrkId)
let messageFilter = filterUtils.prepareFilterMesage(remark)
console.log(messageFilter)
let messageUser = "000000100000"
console.log(filterUtils.checkFilterMessage_User(messageFilter, messageUser, 0))
//for (let s in testALl) {
    //message1 = message.buildMessage(testALl[7].remark)
        //prepareImg.prepareImg(message1)
    //sendMessage.sendPhoto("1238654632", message1, message1.print())
        //message1 = message.buildMessage(test[2])
//}
//message1 = message.buildMessage()
//console.log(message1.print())
//sendMessage.sendPhoto("1238654632",message1,message1.print())
//prepareImg.prepareImg(message1)
//}
//https://kanaria-img.rmrk.link/1636286958976/jpeg/8949162-e0b9bdcc456a36497a-KANBIRD-KANL-00003151.jpg
// sendMessage.testSend("1238654632",'http://kanaria-img.rmrk.link/1636383554180/jpeg/8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00003869.jpg', "test")
// discord.sendRmrkDiscord("ciao", "d", "LIST")

//for(let i = 0; i < 5; i++) 
//sendMessage.sendPhoto("1238654632",`8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615`,"ciao")
// console.log(getMessageGivenFilter.buildMessage(remark).imgSRC)