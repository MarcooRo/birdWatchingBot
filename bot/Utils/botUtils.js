const stop = '\u{1F6D1}'
const checked = '\u{1F7E2}'

exports.reset = function reset(){
    return filter = {"allList": 0,"Buy": 0,"SuperFunder": 0,"Funder": 0,"Rare": 0,"Limited": 0,
    "BackPack": 0,"Background": 0,"Foreground": 0,"Headwear": 0,"Handheld": 0,"Necklace": 0
    }
}
exports.sendStartMenu = function sendStartMenu (ctx, inExecution, bot) {
    const startMessage = "Welcome in Bird Watching Bot";
    chatId = ctx.chat.id
    if(!inExecution){
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Create Filter", callback_data: 'filtra'}
                ]
            ]
        }
    })}
    else {
        bot.telegram.sendMessage(ctx.chat.id, startMessage, {
            reply_markup: {

                inline_keyboard: [
                    [
                        {text: "Create Filter", callback_data: 'filtra'}
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
        bot.telegram.sendMessage(ctx.chat.id, "YOU HAVE NEVER STARTED THE BOT", {
            reply_markup: {
                remove_keyboard: true
            }
        })
    }
    bot.telegram.sendMessage(ctx.chat.id, `Bird Watching stopped! ${stop}`, {
        reply_markup: {
            remove_keyboard: true
        }
    })
    this.sendStartMenu(ctx,0,bot);
}
let ref;
exports.sendFilterMenu = function sendFilterMenu(ctx, bot, filter){
    const menuMessage = "Create your filter!"
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: (filter.allList ? `all List ${checked}`: 'all List') , callback_data: 'allList'},
                    {text: (filter.allBird ? `all Birds ${checked}`: 'all Birds') , callback_data: 'allBird'}
                ],
                [
                    {text: (filter.SuperFunder ? `Super Funder ${checked}`:'Super Funder'), callback_data: 'SuperFunder'},
                    {text: (filter.Funder ? `Funder ${checked}`:'Funder'), callback_data: 'Funder'}
                ],
                [
                    {text: (filter.Rare ? `Rare ${checked}`:'Rare'), callback_data: 'Rare'},
                    {text: (filter.Limited ? `Limited ${checked}`:'Limited'), callback_data: 'Limited'}
                ],
                [
                    {text: (filter.BackPack ? `BackPack ${checked}`:'BackPack'), callback_data: 'BackPack'},
                    {text: (filter.Background ? `Background ${checked}`:'Background'), callback_data: 'Background'}
                ],
                [
                    {text: (filter.ForeGround ? `ForeGround ${checked}`:'ForeGround'), callback_data: 'ForeGround'},
                    {text: (filter.Headwear ? `Headwear ${checked}`:'Headwear'), callback_data: 'Headwear'}
                ],
                [
                    {text: (filter.Handheld ? `Handheld ${checked}`:'Handheld'), callback_data: 'Handheld'},
                    {text: (filter.Necklace ? `Necklace ${checked}`:'Necklace'), callback_data: 'Necklace'}
                ],
                [
                    {text: `Price Limit ${dollar}`, callback_data: 'price'}
                ],
                [
                    {text: "Save and start", callback_data: 'Start'}
                ],
                [
                    {text: "Go back", callback_data: 'Back'}
                ]
            ]
        }
    })
    
}