const message = require('./scriptUtils/messageCreator.js')
const  XMLHttpRequest = require ('xhr2');
const sendMessage = require('./scriptUtils/sendMessage.js')
const https = require('https');
const { request } = require('http');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const d = new Date();
let time = d.getTime();
let n = Math.floor(Math.random() * (time*1000))

//esempio di immagien finita
//ipfs://ipfs/QmQMLMjx55DqbsLRF48kt8c1XTqCJWxvLhF4jQBhnaaz1e/substrapunk/substrapunk_foreground_thumb.png
//https://gateway.pinata.cloud/ipfs/QmQMLMjx55DqbsLRF48kt8c1XTqCJWxvLhF4jQBhnaaz1e/substrapunk/substrapunk_foreground_thumb.png

let url = 'https://kanaria.rmrk.app/api/rmrk2/nft/8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615'
var remark = "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00005557::12825000000000";


let test =  [
"9807302-e0b9bdcc456a36497a-EVNTS-HNTDTR-00000113",
"9807302-e0b9bdcc456a36497a-EVNTS-HNTDTR-00000113",
"8949171-e0b9bdcc456a36497a-KANBIRD-KANL-00008333",
"8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00005366",
"9807302-e0b9bdcc456a36497a-EVNTS-CLDRN-00000081",
"8949162-e0b9bdcc456a36497a-KANBIRD-KANL-00002302",
"9807302-e0b9bdcc456a36497a-EVNTS-BNCHST-00000055"
]

for(let s in test)sendMessage.sendPhoto("1238654632",test[s],"dio")


//for(let i = 0; i < 5; i++) 
//sendMessage.sendPhoto("1238654632",`8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615`,"ciao")
// console.log(getMessageGivenFilter.buildMessage(remark).imgSRC)