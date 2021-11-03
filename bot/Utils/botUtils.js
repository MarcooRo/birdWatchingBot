const stop = '\u{1F6D1}'

exports.reset = function reset(){
    return filter = {"List": 0,"Buy": 0,"SuperFunder": 0,"Funder": 0,"Rare": 0,"Limited": 0,
    "BackPack": 0,"Background": 0,"Foreground": 0,"Headwear": 0,"Handheld": 0,"Necklace": 0
    }
}
exports.sendStartMenu = function sendStartMenu (ctx, inExecution, bot) {
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


exports.doStop = function doStop(ctx, db, bot) {
    //reset filter 
    ctx.deleteMessage()
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
    this.sendStartMenu(ctx,0,bot);
}
exports.sendFilterMenu = function sendFilterMenu(ctx, bot){
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
    
}