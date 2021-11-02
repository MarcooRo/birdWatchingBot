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

exports.addUser = function addUser(bot, chatId, filter) {
    pool.getConnection(function(err, connection) {
        pool.query(`Insert into Users(chatId, filter) Values (${chatId}, "${filter}")`, (err, result, fields) => {
            if(err) {
                if(err.code){
                    bot.telegram.sendMessage(chatId, "Bot già avviato! premi stop per inserire un nuovo filtro", {})
                }else{
                    bot.telegram.sendMessage(chatId, `BOT AVVIATO ${rocket}`, {})
                }
            }
            connection.release()
        })
    });
}

exports.pool = pool

