const TOKEN = "1991386673:AAHd1SiiQAzRVDpM0liFyJYmWs4G3Bg5YMM";
const axios = require('axios')

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
 exports.sendMessage = async(chatId, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    })
}

exports.sendPhoto = async(chatId, photo, caption) => {
    await axios.post(`${TELEGRAM_API}/sendPhoto`, {
        chat_id: chatId,
        photo: photo,
        caption: caption,
        parse_mode: "HTML"
    })
}