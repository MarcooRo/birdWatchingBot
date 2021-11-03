require('dotenv').config()
const { Telegraf, Extra, Markup } = require('telegraf')
const botUtils = require('./Utils/botUtils.js')
const axios = require('axios')
const db = require('./Utils/Db.js');
const { reset } = require('nodemon');
const bot = new Telegraf(process.env.BOT_TOKEN);
const checked = '\u{1F7E2}'
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
    botUtils.sendStartMenu(ctx,0, bot);
})
bot.on('callback_query', (ctx) => {
    let cmd = ctx.callbackQuery.data
    switch(cmd) {
        case 'Indietro':
            ctx.deleteMessage();
            botUtils.sendStartMenu(ctx, bot);
            break;
        case 'Start':
            ctx.deleteMessage()
            let result = "";
            for(key in filter)result += (filter[key]);
            db.addUser(bot, ctx.chat.id, result)
            botUtils.sendStartMenu(ctx,1,bot);
            break
        case 'Stop':
            botUtils.doStop(ctx, db, bot);
            filter = botUtils.reset()
            break
        case 'filtra':
            botUtils.sendFilterMenu(ctx, bot)
            break;
        default:
            if(filter[`${ctx.callbackQuery.data}`]) filter[`${ctx.callbackQuery.data}`] = 0
            else filter[`${ctx.callbackQuery.data}`] = 1
    }

})
bot.launch();