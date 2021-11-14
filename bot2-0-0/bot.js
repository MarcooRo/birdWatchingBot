require('dotenv').config()
const { Telegraf, Extra, Markup } = require('telegraf')
const botUtils = require('./Utils/botUtils.js')
const axios = require('axios')
const db = require('./Utils/Db.js');
const bot = new Telegraf(process.env.BOT_TOKEN);
let filters= {}
let priceLimits = {}

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
const helpMessage = `
/start - to initialize bot
/menu - to show options
/priceLimit - to set price limiter
`

const presentation = `Welcome to birdWatchingBot!
The bot captures all of Kanaria's Birds and Items in real time.
Create your own filter and don't miss a single opportunity!

(This is a beta version, we are working on fixing small bugs, some images will not be able to load immediately, we are working on it, speed is our first goal)`;
    
bot.help(ctx => {
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "Markdown"
    })
})
bot.command('start', ctx => {
    botUtils.sendKeyboardsMenu(ctx,bot)
    bot.telegram.sendMessage(ctx.chat.id, presentation, {parse_mode: "Markdown"})
    bot.telegram.sendMessage(ctx.chat.id, helpMessage, {parse_mode: "Markdown"})
    priceLimits[ctx.chat.id] = 0
    filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0)
})

bot.command('menu', ctx => {
    if(filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
    botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
})

bot.command('priceLimit', ctx => {
     bot.telegram.getUpdates(0).then(res =>{
        let resp = ctx.message.text
        resp = resp.split(" ")
        let n = resp[1]
        console.log(n)
        if(isNaN(n - parseFloat(n))){
             bot.telegram.sendMessage(ctx.chat.id, "Insert a Number!", {parse_mode: "Markdown"})
             return
        }
        priceLimits[ctx.chat.id] = n
        bot.telegram.sendMessage(ctx.chat.id, "Correctly inserted!", {parse_mode: "Markdown"})
        return
     })
})

bot.hears('Filter', (ctx) => {
    if(filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
    botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id]) 
});

bot.hears('Stop', (ctx) => {
    priceLimits[ctx.chat.id] = 0
    filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
    botUtils.doStop(ctx,db, bot);
});

bot.on('callback_query', (ctx) => {
    let cmd = ctx.callbackQuery.data
    switch(cmd) {
        case 'price':
            //ctx.deleteMessage()
            bot.telegram.sendMessage(ctx.chat.id, "Insert your price limit for your filter in this way /priceLimit 0.03 or /priceLimit 5", {parse_mode: "Markdown"})
            break;
        case 'Indietro':
            ctx.deleteMessage();
            break;
        case 'Start':
            ctx.deleteMessage()
            let result = "";
            for(key in filters[ctx.chat.id])result += (filters[ctx.chat.id][key]);
            db.addUser(bot, ctx.chat.id, result, priceLimits[ctx.chat.id])
            break
        case 'Stop':
            ctx.deleteMessage()
            botUtils.doStop(ctx, db, bot);
            priceLimits[ctx.chat.id] = 0
            filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
            break
        default:
            if(filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
            if(filters[ctx.chat.id][`${ctx.callbackQuery.data}`]) filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 0
            else filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 1
            botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
    }

})
bot.launch();
