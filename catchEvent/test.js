const message = require('./scriptUtils/messageCreator.js')
const  XMLHttpRequest = require ('xhr2');
const sendMessage = require('./scriptUtils/sendMessage.js')
const https = require('https');
const { request } = require('http');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const d = new Date();
let time = d.getTime();
let n = Math.floor(Math.random() * (time*1000))
const prepareImg = require('./scriptUtils/prepareImage.js')

//esempio di immagien finita
//ipfs://ipfs/QmQMLMjx55DqbsLRF48kt8c1XTqCJWxvLhF4jQBhnaaz1e/substrapunk/substrapunk_foreground_thumb.png
//https://gateway.pinata.cloud/ipfs/QmQMLMjx55DqbsLRF48kt8c1XTqCJWxvLhF4jQBhnaaz1e/substrapunk/substrapunk_foreground_thumb.png

let url = 'https://kanaria.rmrk.app/api/rmrk2/nft/8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615'
var remark = "RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANL-00002294::950000000000000";


let test =  [
"RMRK::LIST::2.0.0::8949171-e0b9bdcc456a36497a-KANBIRD-KANL-00009272::1899050000000",
"RMRK::LIST::2.0.0::8949171-e0b9bdcc456a36497a-KANBIRD-KANL-00009260::1899050000000",
"RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANL-00002312::316350000000000",
"RMRK::LIST::2.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANL-00002294::950000000000000"
]

let message1 = message.buildMessage(test[2])
console.log(message1.reamrkId)

for(let s in test) {
   // message1 = message.buildMessage(test[s])
   // sendMessage.sendPhoto("1238654632",message1,message1.print())
}
//https://kanaria-img.rmrk.link/1636286958976/jpeg/8949162-e0b9bdcc456a36497a-KANBIRD-KANL-00003151.jpg
// sendMessage.testSend("1238654632",'http://kanaria-img.rmrk.link/1636383554180/jpeg/8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00003869.jpg', "test")
prepareImg.prepareImg(message1)

//for(let i = 0; i < 5; i++) 
//sendMessage.sendPhoto("1238654632",`8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615`,"ciao")
// console.log(getMessageGivenFilter.buildMessage(remark).imgSRC)