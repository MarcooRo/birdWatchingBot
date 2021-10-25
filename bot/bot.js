require('dotenv').config()
const { Telegraf } = require('telegraf')
const { Extra, Markup, InlineKeyboardMarkup} = require('telegraf');
const axios = require('axios')
const BotStart = require('../catchEvent')
const bot = new Telegraf(process.env.BOT_TOKEN);

let chatId = ""
let inExecution = false
const checked = '\u{1F7E2}'

bot.help(ctx => {
    const helpMessage = `
    Benvenuto, inserire o premere 
    /start - per inizializzare il bot
    `

    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "Markdown"
    })
})

bot.command('start', ctx => {
    sendStartMenu(ctx);
})



function sendStartMenu (ctx) {
    const startMessage = "Benvenuto su BirdWatchingBot";
    chatId = ctx.chat.id
    if(!inExecution){
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Crea Filtro", callback_data: 'filtra'}
                ]
            ]
        }
    })}
    else {
        bot.telegram.sendMessage(ctx.chat.id, startMessage, {
            reply_markup: {

                inline_keyboard: [
                    [
                        {text: "Crea Filtro", callback_data: 'filtra'}
                    ],
                    [
                        {text: "Stop", callback_data: 'Stop'}
                    ]
                ]
            }
        })
    }
    
}


bot.action('filtra', ctx => {
    const menuMessage = "Crea il tuo filtro!"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Test", callback_data: 'test'}
                ],
                [
                    {text: "Start", callback_data: 'Start'}
                ],
                [
                    {text: "Indietro", callback_data: 'indietro'}
                ]
            ]
        }
    })
    
})

bot.action('indietro', ctx => {
    sendStartMenu(ctx);
})

bot.action('Start', ctx => {
    inExecution = true
    BotStart.BotStart()
    bot.telegram.sendMessage(ctx.chat.id, "BOT LANCIATO", {
        reply_markup: {
            remove_keyboard: true
        }
    })
  
})

bot.action('test', ctx = async() => {
   //ctx.editMessageText("ciao")
   console.log(await bot.telegram.getUpdates(2))
})

bot.action('Stop', ctx => {
    inExecution = false
    bot.telegram.sendMessage(ctx.chat.id, "BOT FERMATO!", {
        reply_markup: {
            remove_keyboard: true
        }
    })
  
    //forever lo rimanda su 
    //process.exit()
})


bot.launch();