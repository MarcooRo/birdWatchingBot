const stop = '\u{1F6D1}'
const checked = '\u{1F7E2}'
const start = '\u{23E9}'
const rocket = '\u{1F680}'
const back = '\u{1F519}'
const dollar = '\u{1F4B5}'

exports.sendKeyboardsMenu = function sendKeyboardsMenu(ctx, bot) {
    bot.telegram.sendMessage(ctx.chat.id, 'Welcome on Bird Watching Bot', {
        reply_markup: {
            "resize_keyboard": true,
            "one_time_keyboard": true,
            keyboard: [
                [
                    { text: `Filter ` }, { text: `Stop ` }
                ]
            ]
        }
    })
}

exports.doStop = function doStop(ctx, db, bot) {
    db.deleteUser(ctx.chat.id, bot)
}

exports.sendFilterMenu = function sendFilterMenu(ctx, bot, filter) {
    const menuMessage = "Create your filter!"
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: (filter.allList ? `All ${checked}` : 'All'), callback_data: 'allList' },
                    { text: `Set single NFT ${dollar}`, callback_data: 'nft' }
                ],
                [
                    { text: `Set Collection ${dollar}`, callback_data: 'collection' },
                    { text: `Set Price Limit ${dollar}`, callback_data: 'price' }
                ],
                [
                    { text: `Save and Start ${rocket}`, callback_data: 'Start' }
                ],
                [
                    { text: `Back ${back}`, callback_data: 'Indietro' }
                ]
            ]
        }
    })

}