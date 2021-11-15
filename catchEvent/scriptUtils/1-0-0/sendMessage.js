const TOKEN = "2117447283:AAFy_hqYFvfxO5jTctpvS1_aB9Arv2xGP24";
//1991386673:AAHd1SiiQAzRVDpM0liFyJYmWs4G3Bg5YMM
const axios = require('axios')
const  XMLHttpRequest = require ('xhr2');

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`


exports.testSend =function sendMessage(chatId, text) {
    axios.post(`https://api.telegram.org/bot2117447283:AAFy_hqYFvfxO5jTctpvS1_aB9Arv2xGP24/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    }).catch(function (error) {
        console.log("errori.......")
    })
}
 function sendMessage(chatId, text) {
    axios.post(`https://api.telegram.org/bot2117447283:AAFy_hqYFvfxO5jTctpvS1_aB9Arv2xGP24/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    }).catch(function (error) {
        console.log("errori.......")
    })
}

function sendNormalPhoto(chatId, img, caption) {
     axios.post(`${TELEGRAM_API}/sendPhoto`, {
         chat_id: chatId,
         photo: img,
         caption: caption,
         parse_mode: "HTML"
      }).catch(function (error) {
         sendMessage(chatId, caption)
       });
 }

function getMetadataAndImage(url2, chatId, caption) {
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
            img = JSON.parse(xhr2.responseText).image
            let temp = img.substring(6, img.lenght)
            let objectPhoto = `https://gateway.pinata.cloud`+temp
            sendNormalPhoto(chatId,objectPhoto, caption);
        }
    }
    xhr2.open('GET', url2, true);
    xhr2.send(null);
}

exports.sendPhoto = (chatId, message, caption) => {
    remarkId = message.reamrkId
    var xhr = new XMLHttpRequest();
    let url = `https://kanaria.rmrk.app/api/rmrk1/nft/${remarkId}`
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                let img = JSON.parse(xhr.responseText).image
                let temp = url2.substring(6, img.lenght)
                //https://rmrk.mypinata.cloud/ipfs/bafkreiffrshcj4kjeh4vd2icgtcj4blrzarf64fjwj5x2qwwkk2xtya7u4
                getMetadataAndImage('https://rmrk.mypinata.cloud'+temp, chatId, caption)

            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}