const stop = '\u{1F6D1}'
const checked = '\u{1F7E2}'
const start = '\u{23E9}'
const rocket = '\u{1F680}'
const back = '\u{1F519}'
const dollar = '\u{1F4B5}'

exports.sendStartMenu = function sendStartMenu (ctx, inExecution, bot) {
    const startMessage = "Benvenuto su BirdWatchingBot";
    chatId = ctx.chat.id
    if(!inExecution){
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: `Crea Filtro ${start}`, callback_data: 'filtra'}
                ]
            ]
        }
    })}
    else {
        bot.telegram.sendMessage(ctx.chat.id, startMessage, {
            reply_markup: {

                inline_keyboard: [
                    [
                        {text: `Crea Filtro ${start}`, callback_data: 'filtra'}
                    ],
                    [
                        {text: `Stop ${stop}`, callback_data: 'Stop'}
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
let ref;
exports.sendFilterMenu = function sendFilterMenu(ctx, bot, filter){
    const menuMessage = "Crea il tuo filtro!"
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: (filter.allList ? `All${checked}`: 'All') , callback_data: 'allList'},
                    {text: (filter.allBird ? `allBirds${checked}`: 'allBirds') , callback_data: 'allBird'}
                ],
                [
                    {text: (filter.SuperFunder ? `Super Funder${checked}`:'Super Funder'), callback_data: 'SuperFunder'},
                    {text: (filter.Funder ? `Funder${checked}`:'Funder'), callback_data: 'Funder'}
                ],
                [
                    {text: (filter.Rare ? `Rare${checked}`:'Rare'), callback_data: 'Rare'},
                    {text: (filter.Limited ? `Limited${checked}`:'Limited'), callback_data: 'Limited'}
                ],
                [
                    {text: (filter.BackPack ? `BackPack${checked}`:'BackPack'), callback_data: 'BackPack'},
                    {text: (filter.Background ? `Background${checked}`:'Background'), callback_data: 'Background'}
                ],
                [
                    {text: (filter.ForeGround ? `ForeGround${checked}`:'ForeGround'), callback_data: 'ForeGround'},
                    {text: (filter.Headwear ? `Headwear${checked}`:'Headwear'), callback_data: 'Headwear'}
                ],
                [
                    {text: (filter.Handheld ? `Handheld${checked}`:'Handheld'), callback_data: 'Handheld'},
                    {text: (filter.Necklace ? `Necklace${checked}`:'Necklace'), callback_data: 'Necklace'}
                ],
                [
                    {text: `Price Limit${dollar}`, callback_data: 'price'}
                ],
                [
                    {text: `Salva e avvia ${rocket}`, callback_data: 'Start'}
                ],
                [
                    {text: `Indietro ${back}`, callback_data: 'Indietro'}
                ]
            ]
        }
    })
    
}