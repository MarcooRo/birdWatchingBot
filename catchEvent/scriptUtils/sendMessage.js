const TOKEN = "1991386673:AAHd1SiiQAzRVDpM0liFyJYmWs4G3Bg5YMM";
const axios = require('axios')
const  XMLHttpRequest = require ('xhr2');

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
 exports.sendMessage = async(chatId, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    })
}

exports.sendPhoto = (chatId, remarkId, caption) => {
    var xhr = new XMLHttpRequest();
    var url = `https://kanaria.rmrk.app/api/rmrk2/nft/${remarkId}`
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                let img = JSON.parse(xhr.responseText).image    
                axios.post(`${TELEGRAM_API}/sendPhoto`, {
                    chat_id: chatId,
                    photo: img,
                    caption: caption,
                    parse_mode: "HTML"
                 }).catch(function (error) {
                    axios.post(`${TELEGRAM_API}/sendMessage`, {
                        chat_id: chatId,
                        text: caption,
                        parse_mode: "HTML"
                    })
                  });

                }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}