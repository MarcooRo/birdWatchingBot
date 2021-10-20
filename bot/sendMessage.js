

const { TOKEN } = process.env
const axios = require('axios')

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
 exports.sendMessage = async(chatId, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
    })
}