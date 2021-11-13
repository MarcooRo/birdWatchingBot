const { createPool } = require('mysql');
const rocket = '\u{1F680}'
const stop = '\u{1F6D1}'

const pool = createPool({
    host: "myapp1",
    user: "moeuser",
    password: "moepass",
    database: "progettoHackaton",
    connectionLimit: "10"
})

exports.deleteUser = function deleteUser(chatId, bot) {
    pool.getConnection(function(err, connection) {
        pool.query(`Delete From Users Where chatId=?`,[chatId], (err, result, fields) =>{
            if(err) {
                bot.telegram.sendMessage(chatId, "Error", {parse_mode: "Markdown"})
            }
            if(result.affectedRows == 0){
                bot.telegram.sendMessage(chatId, "Bot not in execution, please create a filter", {parse_mode: "Markdown"})
            }else{
                bot.telegram.sendMessage(chatId, `BOT STOPPED ${stop}`, {parse_mode: "Markdown" })
            }
        })
         connection.release()
    });
}

exports.addUser = function addUser(bot, chatId, filter, nft, collection, priceLimit) {
    pool.getConnection(function(err, connection) {
        pool.query(`Insert into Users (chatId, filter, nftCollection, nftObject, priceLimit) Values (${chatId},"${filter}","${collection}","${nft}",${priceLimit})`, (err, result, fields) => {
            if(err) {
                bot.telegram.sendMessage(chatId, "Bot already started! press stop to insert a new filter", {parse_mode: "Markdown"})
            }else{
                bot.telegram.sendMessage(chatId, `BOT STARTED ${rocket}`, {parse_mode: "Markdown" })
            }
            
        })
        connection.release()
    });
}

exports.pool = pool

