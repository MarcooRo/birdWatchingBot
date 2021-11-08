require('dotenv').config()
const { Telegraf, Extra, Markup } = require('telegraf')
const botUtils = require('./Utils/botUtils.js')
const axios = require('axios')
const db = require('./Utils/Db.js');
const { reset } = require('nodemon');
const bot = new Telegraf(process.env.BOT_TOKEN);
const checked = '\u{1F7E2}'
let filters= {}

function Filter(allList,allBird,SuperFunder,Funder,Rare,Limited,BackPack,Background,Foreground,Headwear,Handheld,Necklace){
    this.allList = allList
    this.allBird = allBird
    this.SuperFunder = SuperFunder
    this.Funder = Funder
    this.Rare = Rare
    this.Limited = Limited
    this.BackPack = BackPack
    this.Background = Background
    this.ForeGround = Foreground
    this.Headwear = Headwear
    this.Handheld = Handheld
    this.Necklace = Necklace
}

bot.help(ctx => {
    const helpMessage = `
    /start - to initialize the bot
    /menu - to show the options
    `
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "Markdown"
    })
})
bot.command('start', ctx => {
    botUtils.sendStartMenu(ctx,0, bot);
    filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0)
})

bot.command('menu', ctx => {
    botUtils.sendStartMenu(ctx,1, bot);
})

bot.command('priceLimit', ctx => {
    let resp = bot.telegram.getUpdates().then(console.log).text
    console.log("test"+resp)
})

bot.on('callback_query', (ctx) => {
    let cmd = ctx.callbackQuery.data
    switch(cmd) {
        case 'Back':
            ctx.deleteMessage();
            botUtils.sendStartMenu(ctx,0, bot);
            break;
        case 'Start':
            ctx.deleteMessage()
            let result = "";
            for(key in filters[ctx.chat.id])result += (filters[ctx.chat.id][key]);
            db.addUser(bot, ctx.chat.id, result)
            botUtils.sendStartMenu(ctx,1,bot);
            break
        case 'Stop':
            botUtils.doStop(ctx, db, bot);
            filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0)
            break
        case 'filtra':
            botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
            break;
        case 'price':
            //ctx.deleteMessage()
            bot.telegram.sendMessage(ctx.chat.id, "Insert your price limit for your filter in this way /priceLimit 0.03 or /priceLimit 5", {parse_mode: "Markdown"})
            break;
        default:
            if(filters[ctx.chat.id][`${ctx.callbackQuery.data}`]) filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 0
            else filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 1
            botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
    }

})
bot.launch();