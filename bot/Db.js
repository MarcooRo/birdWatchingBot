const { createPool } = require('mysql');

const pool = createPool({
    host: "mysql",
    user: "moeuser",
    password: "moepass",
    database: "progettoHackaton",
    connectionLimit: "10"
})


exports.getAllUsers = function getAllUsers() {
        pool.query(`Select * from Users`, (err, result, fields) =>{
            if(err) return console.log(err)
            else result
        })
}

exports.deleteUser = function deleteUser(chatId) {
    pool.query(`Delete From Users Where chatId=?`,[chatId], (err, result, fields) =>{
        if(err) return console.log(err)
    })
}

exports.addUser = function addUser(chatId, filter) {
    pool.query(`Insert into Users(chatId, filter) Values (${chatId}, ${filter})`, (err, result, fields) => {
        if(err) return console.log(err)
    })
}