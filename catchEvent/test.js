const message = require('./scriptUtils/messageCreator.js')
const  XMLHttpRequest = require ('xhr2');
const sendMessage = require('./scriptUtils/sendMessage.js')
const https = require('https');
const { request } = require('http');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const d = new Date();
let time = d.getTime();
let n = Math.floor(Math.random() * (time*1000))

let url = 'https://kanaria.rmrk.app/api/rmrk2/nft/8949162-e0b9bdcc456a36497a-KANBIRD-KANS-00000006'

    // 1654536492:AAF2AbCQ_vJ89XWBPreGTfgAyKWJkbsKjIM  token bot KUSAMA official
    // 1991386673:AAHd1SiiQAzRVDpM0liFyJYmWs4G3Bg5YMM token bot di testing
   
    
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == 4) {
    //         sendMessage.sendPhoto("1238654632",(JSON.parse(xhr.responseText).image), "ciao");
    //     }
    // }
    // xhr.open('GET', url, true);
    // xhr.send(null);
   
    //sendMessage.sendPhoto("1238654632",(JSON.parse(xhr.responseText).image), "ciao");


var remark = "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00005557::12825000000000";

for(let i = 0; i < 5; i++) sendMessage.sendPhoto("1238654632",`8949162-e0b9bdcc456a36497a-KANBIRD-KANS-0000000${i}`,message.buildMessage(remark).print())
// console.log(getMessageGivenFilter.buildMessage(remark).imgSRC)