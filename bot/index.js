require('dotenv/types').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const BotStart = require('../catchEvent.js');
const sendMessage = require('./sendMessage.js');


const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    //console.log(req.body)

    const chatId = req.body.message.chat.id
    const text = req.body.message.text
    if(text == "Start") {
        //BotStart.BotStart(true, null)
    }
    console.log(text)
    //sendMessage.sendMessage(chatId, text)
    return res.send()
})

app.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})