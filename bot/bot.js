require('dotenv').config()
const { Telegraf, Extra, Markup } = require('telegraf')
const axios = require('axios')
const db = require('./Db.js');
const bot = new Telegraf(process.env.BOT_TOKEN);
let filter = {  
    "List": 0,
    "Buy": 0,
    "SuperFunder": 0,
    "Funder": 0,
    "Rare": 0,
    "Limited": 0,
    "BackPack": 0,
    "Background": 0,
    "Foreground": 0,
    "Headwear": 0,
    "Handheld": 0,
    "Necklace": 0
}
const checked = '\u{1F7E2}'
const rocket = '\u{1F680}'
const stop = '\u{1F6D1}'
let id = 0;

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

function sendStartMenu (ctx, inExecution) {
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
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "List", callback_data: 'List'},
                    {text: "Buy", callback_data: 'Buy'},
                ],
                [
                    {text: "Super Funder", callback_data: 'Super Funder'},
                    {text: "Funder", callback_data: 'Funder'}
                ],
                [
                    {text: "Rare", callback_data: 'Rare'},
                    {text: "Limited", callback_data: 'Limited'}
                ],
                [
                    {text: "BackPack", callback_data: 'BackPack'},
                    {text: "Background", callback_data: 'Background'}
                ],
                [
                    {text: "ForeGround", callback_data: 'ForeGround'},
                    {text: "Headwear", callback_data: 'Headwear'}
                ],
                [
                    {text: "Handheld", callback_data: 'Handheld'},
                    {text: "Necklace", callback_data: 'Necklace'}
                ],
                [
                    {text: "Salva e avvia", callback_data: 'Start'}
                ],
                [
                    {text: "Indietro", callback_data: 'Indietro'}
                ]
            ]
        }
    })
    
})

bot.action('Indietro', ctx => {
    ctx.deleteMessage();
    sendStartMenu(ctx);
})  
bot.action('Start', ctx => {
    ctx.deleteMessage()
    let result = "";
    for(key in filter)result += (filter[key]);
    db.addUser(bot, ctx.chat.id, result )
    console.log(result)
    sendStartMenu(ctx,1);
})
bot.action('List', ctx = async() => {
   if(filter.List) filter.List = 0
   else filter.List = 1
   console.log(bot.EditMessageReplyMarkup)
})
bot.action('Buy', ctx = async() => {
    if(filter.Buy) filter.Buy = 0
    else filter.Buy = 1
 })
bot.action('Funder', ctx = async() => {
    if(filter.Funder) filter.Funder = 0
    else filter.Funder = 1
})
bot.action('Super Funder', ctx = async() => {
    if(filter.SuperFunder) filter.SuperFunder = 0
    else filter.SuperFunder = 1
})
bot.action('Rare', ctx = async() => {
    if(filter.Rare) filter.Rare = 0
    else filter.Rare = 1
})
bot.action('Limited', ctx = async() => {
    if(filter.Limited) filter.Limited = 0
    else filter.Limited = 1
})
bot.action('BackPack', ctx = async() => {
    if(filter.BackPack) filter.BackPack = 0
    else filter.BackPack = 1
 })
bot.action('Background', ctx = async() => {
    if(filter.Background) filter.Background = 0
    else filter.Background = 1
})
bot.action('ForeGround', ctx = async() => {
    if(filter.ForeGround) filter.ForeGround = 0
    else filter.ForeGround = 1
 })
bot.action('Headwear', ctx = async() => {
    if(filter.Headwear) filter.Headwear = 0
    else filter.Headwear = 1
})
bot.action('Handheld', ctx = async() => {
    if(filter.Handheld) filter.Handheld = 0
    else filter.Handheld = 1
 })
bot.action('Necklace', ctx = async() => {
    if(filter.Necklace) filter.Necklace = 0
    else filter.Necklace = 1
})
bot.action('Stop', ctx => {
    //reset filter 
    ctx.deleteMessage()
    filter = {"List": 0,"Buy": 0,"SuperFunder": 0,"Funder": 0,"Rare": 0,"Limited": 0,
    "BackPack": 0,"Background": 0,"Foreground": 0,"Headwear": 0,"Handheld": 0,"Necklace": 0
    }
    if(db.deleteUser(ctx.chat.id) == -1){
        bot.telegram.sendMessage(ctx.chat.id, "NON HAI MAI AVVIATO IL BOT", {
            reply_markup: {
                remove_keyboard: true
            }
        })
    }
    bot.telegram.sendMessage(ctx.chat.id, `BOT FERMATO! ${stop}`, {
        reply_markup: {
            remove_keyboard: true
        }
    })
    sendStartMenu(ctx,0);
})

bot.launch();