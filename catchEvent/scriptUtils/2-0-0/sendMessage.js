const TOKEN = "2133146268:AAEMZDpDy6mihaGugxUTuDwtFZ6PgMAtWww";
const axios = require('axios')
const  XMLHttpRequest = require ('xhr2');
const linkCatalogo = "https://kanaria.rmrk.app/catalogue/";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`


exports.testSend =function sendMessage(chatId, text) {
    axios.post(`https://api.telegram.org/bot2133146268:AAEMZDpDy6mihaGugxUTuDwtFZ6PgMAtWww/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    }).catch(function (error) {
        console.log("errori.......")
    })
}
 function sendMessage(chatId, text) {
    axios.post(`https://api.telegram.org/bot2133146268:AAEMZDpDy6mihaGugxUTuDwtFZ6PgMAtWww/sendMessage`, {
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

function getMetadataAndImage(url2, chatId, caption, message) {
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
            img = JSON.parse(xhr2.responseText).image
            let temp = img.substring(6, img.lenght)
            let objectPhoto = `https://gateway.pinata.cloud`+temp
            caption += `Rarity: `+JSON.parse(xhr2.responseText).properties.rarity.value+`\n`
            caption += `Number of copy: `+JSON.parse(xhr2.responseText).properties.total_count.value
            caption += `\n\n<a href="`+message.link+`">Take a Look --> </a>`
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
                console.log(xhr.responseText)
                let img = JSON.parse(xhr.responseText).image
                
                if(img != '' && img != undefined){
                    caption += `\n\n<a href="`+message.link+`">Take a Look --> </a>`
                    sendNormalPhoto(chatId, img, caption)
                } else {
                    let url2 = JSON.parse(xhr.responseText).metadata
                    let temp = url2.substring(6, url2.lenght)
                    getMetadataAndImage('https://rmrk.mypinata.cloud'+temp, chatId, caption, message)
                }

            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}