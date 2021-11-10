const TOKEN = "1991386673:AAF_qUILSZJ4icbQwGb4GJn9-jOJ8NaU7lY";
//1991386673:AAHd1SiiQAzRVDpM0liFyJYmWs4G3Bg5YMM
const axios = require('axios')
const  XMLHttpRequest = require ('xhr2');

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
 function sendMessage(chatId, text) {
    axios.post(`https://api.telegram.org/bot1991386673:AAF_qUILSZJ4icbQwGb4GJn9-jOJ8NaU7lY/sendMessage`, {
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
    console.log("\n\n request 2 ")
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
            img = JSON.parse(xhr2.responseText).image
            let temp = img.substring(6, img.lenght)
            console.log(temp)
            let objectPhoto = `https://gateway.pinata.cloud`+temp
            console.log(objectPhoto)
            sendNormalPhoto(chatId,objectPhoto, caption);
        }
    }
    xhr2.open('GET', url2, true);
    xhr2.send(null);
}

exports.sendPhoto = (chatId, message, caption) => {
    remarkId = message.reamrkId
    var xhr = new XMLHttpRequest();
    let url = `https://kanaria.rmrk.app/api/rmrk2/nft/${remarkId}`
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                let img = JSON.parse(xhr.responseText).image
                let test = `<a href="${img}"> </a>`;
                caption = test+caption;
                console.log(caption)
                message.imgSRC = img
                if(img != '' && img != undefined){  
                    console.log("campo immagine esistente e' un uccello")
                    sendNormalPhoto(chatId, img, caption)
                } else {
                    let url2 = JSON.parse(xhr.responseText).metadata
                    let temp = url2.substring(6, url2.lenght)
                    //https://rmrk.mypinata.cloud/ipfs/bafkreiffrshcj4kjeh4vd2icgtcj4blrzarf64fjwj5x2qwwkk2xtya7u4
                    console.log('https://rmrk.mypinata.cloud'+temp)
                    getMetadataAndImage('https://rmrk.mypinata.cloud'+temp, chatId, caption)
                }

                }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}