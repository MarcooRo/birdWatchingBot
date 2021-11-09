const { createPool } = require('mysql');
const rocket = '\u{1F680}'

const pool = createPool({
    host: "mysql",
    user: "moeuser",
    password: "moepass",
    database: "progettoHackaton",
    connectionLimit: "10"
})

exports.deleteUser = function deleteUser(chatId) {
    pool.getConnection(function(err, connection) {
        pool.query(`Delete From Users Where chatId=?`,[chatId], (err, result, fields) =>{
            if(err) return -1
        })
        connection.release()
    });
}

exports.addUser = function addUser(bot, chatId, filter, price) {
    pool.getConnection(function(err, connection) {
        pool.query(`Insert into Users(chatId, filter, priceLimit) Values (${chatId}, "${filter}",${price})`, (err, result, fields) => {
            if(err) {
                bot.telegram.sendMessage(chatId, "Bot already started! press stop to insert a new filtero", {parse_mode: "Markdown"})
            }else{
                bot.telegram.sendMessage(chatId, `BOT STARTED ${rocket}`, {parse_mode: "Markdown" })
            }
            
            connection.release()
        })
    });
}

exports.pool = pool

