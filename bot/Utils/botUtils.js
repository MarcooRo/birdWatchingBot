const stop = '\u{1F6D1}'
const checked = '\u{1F7E2}'
const start = '\u{23E9}'
const rocket = '\u{1F680}'
const back = '\u{1F519}'
const dollar = '\u{1F4B5}'

exports.sendKeyboardsMenu = function sendKeyboardsMenu(ctx, bot){
    bot.telegram.sendMessage(ctx.chat.id, 'Welcome on Bird Watching Bot', {
        reply_markup: {
            "resize_keyboard": true,
            "one_time_keyboard": true,
                keyboard: [
                    [
                        {text: `Filter `},{text: `Stop `}
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
                    { text: (filter.allBird ? `all Birds ${checked}` : 'all Birds'), callback_data: 'allBird' }
                ],
                [
                    { text: (filter.SuperFunder ? `Super Funder ${checked}` : 'Super Funder'), callback_data: 'SuperFunder' },
                    { text: (filter.Funder ? `Funder ${checked}` : 'Funder'), callback_data: 'Funder' }
                ],
                [
                    { text: (filter.Rare ? `Rare ${checked}` : 'Rare'), callback_data: 'Rare' },
                    { text: (filter.Limited ? `Limited ${checked}` : 'Limited'), callback_data: 'Limited' }
                ],
                [
                    { text: (filter.BackPack ? `BackPack ${checked}` : 'BackPack'), callback_data: 'BackPack' },
                    { text: (filter.Background ? `Background ${checked}` : 'Background'), callback_data: 'Background' }
                ],
                [
                    { text: (filter.ForeGround ? `ForeGround ${checked}` : 'ForeGround'), callback_data: 'ForeGround' },
                    { text: (filter.Headwear ? `Headwear ${checked}` : 'Headwear'), callback_data: 'Headwear' }
                ],
                [
                    { text: (filter.Handheld ? `Handheld ${checked}` : 'Handheld'), callback_data: 'Handheld' },
                    { text: (filter.Necklace ? `Necklace ${checked}` : 'Necklace'), callback_data: 'Necklace' }
                ],
                [
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