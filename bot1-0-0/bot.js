require('dotenv').config()
const { Telegraf, Extra, Markup } = require('telegraf')
const botUtils = require('./Utils/botUtils.js')
const axios = require('axios')
const db = require('./Utils/Db.js');
const bot = new Telegraf(process.env.BOT_TOKEN);
let filters = {}
let priceLimits = {}
let nft = {}
let collection = {}

function Filter(allList) {
    this.allList = allList
}
const helpMessage = `
/start - to initialize bot
/menu - to show options
/nft - to set single NFT
/collection - to set Collection
/priceLimit - to set price limiter
`

const presentation = `Welcome to Singular Watching!
The bot captures all of remerk 1.0.0 on singular in real time.
Create your own filter and don't miss a single opportunity!

(This is a beta version, we are working on fixing small bugs)`;

bot.help(ctx => {
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "Markdown"
    })
})
bot.command('start', ctx => {
    botUtils.sendKeyboardsMenu(ctx, bot)
    bot.telegram.sendMessage(ctx.chat.id, presentation, { parse_mode: "Markdown" })
    bot.telegram.sendMessage(ctx.chat.id, helpMessage, { parse_mode: "Markdown" })
    nft[ctx.chat.id] = 0
    collection[ctx.chat.id] = 0
    priceLimits[ctx.chat.id] = 0
    filters[ctx.chat.id] = new Filter(0, 0, 0, 0) // all, prezzo, nft, collectio
})

bot.command('menu', ctx => {
    if (filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0, 0, 0, 0) // all, prezzo, nft, collectio
    botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
})

bot.command('nft', ctx => { // to cehck
    bot.telegram.getUpdates(0).then(res => {
        let resp = ctx.message.text
        resp = resp.split(" ")
        let n = resp[1]
        nft[ctx.chat.id] = n
        bot.telegram.sendMessage(ctx.chat.id, "Correctly inserted!", { parse_mode: "Markdown" })
        return
    })
})

bot.command('collection', ctx => { // to cehck
    bot.telegram.getUpdates(0).then(res => {
        let resp = ctx.message.text
        resp = resp.split(" ")
        let n = resp[1]
        collection[ctx.chat.id] = n
        bot.telegram.sendMessage(ctx.chat.id, "Correctly inserted!", { parse_mode: "Markdown" })
        return
    })
})

bot.command('priceLimit', ctx => {
    bot.telegram.getUpdates(0).then(res => {
        let resp = ctx.message.text
        resp = resp.split(" ")
        let n = resp[1]
        priceLimits[ctx.chat.id] = n
        bot.telegram.sendMessage(ctx.chat.id, "Correctly inserted!", { parse_mode: "Markdown" })
        return
    })
})

bot.hears('Filter', (ctx) => {
    if (filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
});

bot.hears('Stop', (ctx) => {
    nft[ctx.chat.id] = 0
    collection[ctx.chat.id] = 0
    priceLimits[ctx.chat.id] = 0
    filters[ctx.chat.id] = new Filter(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    botUtils.doStop(ctx, db, bot);
});

bot.on('callback_query', (ctx) => {
    let cmd = ctx.callbackQuery.data
    switch (cmd) {
        case 'price':
            //ctx.deleteMessage()
            bot.telegram.sendMessage(ctx.chat.id, "Insert a NFT ID ", { parse_mode: "Markdown" })
            break;
        case 'nft':
            //ctx.deleteMessage()
            bot.telegram.sendMessage(ctx.chat.id, "Insert a collection ID!", { parse_mode: "Markdown" })
            break;
        case 'collection':
            //ctx.deleteMessage()
            bot.telegram.sendMessage(ctx.chat.id, "Insert your price limit for your filter in this way /priceLimit 0.03 or /priceLimit 5", { parse_mode: "Markdown" })
            break;
        case 'Indietro':
            ctx.deleteMessage();
            break;
        case 'Start':
            ctx.deleteMessage()
            let result = "";
            for (key in filters[ctx.chat.id]) result += (filters[ctx.chat.id][key]);
            db.addUser(bot, ctx.chat.id, result, collection[ctx.chat.id],nft[ctx.chat.id], priceLimits[ctx.chat.id])
            break
        case 'Stop':
            ctx.deleteMessage()
            botUtils.doStop(ctx, db, bot);
            priceLimits[ctx.chat.id] = 0
            filters[ctx.chat.id] = new Filter(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            break
        default:
            if (filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            if (filters[ctx.chat.id][`${ctx.callbackQuery.data}`]) filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 0
            else filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 1
            botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
    }

})
bot.launch();