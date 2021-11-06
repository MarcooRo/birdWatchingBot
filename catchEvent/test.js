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

function getMetadataAndImage(url2){
    console.log("\n\n request 2 ")
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
            img = JSON.parse(xhr2.responseText).image
            let temp = img.substring(6, img.lenght)
            console.log(temp)
            let objectPhoto = `https://gateway.pinata.cloud`+temp
            console.log(objectPhoto)
            sendMessage.sendNormalPhoto("1238654632",objectPhoto, "ciao");

            
        }
    }
    xhr2.open('GET', url2, true);
    xhr2.send(null);
}


    // 1654536492:AAF2AbCQ_vJ89XWBPreGTfgAyKWJkbsKjIM  token bot KUSAMA official
    // 1991386673:AAHd1SiiQAzRVDpM0liFyJYmWs4G3Bg5YMM token bot di testing
   
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            img = JSON.parse(xhr.responseText).image
            
            if(img != '')sendMessage.sendPhoto("1238654632",(JSON.parse(xhr.responseText).image), "ciao");
            else{
                let url2 = JSON.parse(xhr.responseText).metadata
                let temp = url2.substring(6, url2.lenght)
                console.log(temp)
                //https://rmrk.mypinata.cloud/ipfs/bafkreiffrshcj4kjeh4vd2icgtcj4blrzarf64fjwj5x2qwwkk2xtya7u4
                console.log('https://rmrk.mypinata.cloud'+temp)
                getMetadataAndImage('https://rmrk.mypinata.cloud'+temp)
                
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
    
   
    //sendMessage.sendPhoto("1238654632",(JSON.parse(xhr.responseText).image), "ciao");


var remark = "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00005557::12825000000000";

//for(let i = 0; i < 5; i++) 
//sendMessage.sendPhoto("1238654632",`8788682-e0b9bdcc456a36497a-KANFRNT-substrapunk_foreground-00002615`,"ciao")
// console.log(getMessageGivenFilter.buildMessage(remark).imgSRC)