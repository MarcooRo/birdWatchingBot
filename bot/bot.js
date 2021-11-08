require('dotenv').config()
const { Telegraf, Extra, Markup } = require('telegraf')
const botUtils = require('./Utils/botUtils.js')
const axios = require('axios')
const db = require('./Utils/Db.js');
const bot = new Telegraf(process.env.BOT_TOKEN);
let filters= {}

function Filter(allList,allBird,SuperFunder,Funder,Rare,Limited,BackPack,Background,Foreground,Headwear,Handheld,Necklace,price){
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
    this.Handheld =Handheld
    this.Necklace = Necklace
    this,price = price
}
    
bot.help(ctx => {
    const helpMessage = `
    Benvenuto su, lista comandi 
    /start - per inizializzare il bot
    /menu per mostarer le opzioni
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
    console.log("asdasd"+resp)
    
})

bot.on('callback_query', (ctx) => {
    let cmd = ctx.callbackQuery.data
    switch(cmd) {
        case 'price':
            //ctx.deleteMessage()
            bot.telegram.sendMessage(ctx.chat.id, "Insert your price limit for your filter in this way /priceLimit 0.03 or /priceLimit 5", {parse_mode: "Markdown"})
            break;
        case 'Indietro':
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
            filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
            break
        case 'filtra':
            if(filters[ctx.chat.id] == undefined) filters[ctx.chat.id] = new Filter(0,0,0,0,0,0,0,0,0,0,0,0,0)
            botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
            break;
        default:
            if(filters[ctx.chat.id][`${ctx.callbackQuery.data}`]) filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 0
            else filters[ctx.chat.id][`${ctx.callbackQuery.data}`] = 1
            botUtils.sendFilterMenu(ctx, bot, filters[ctx.chat.id])
    }

})
bot.launch();