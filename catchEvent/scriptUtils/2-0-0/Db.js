const { createPool } = require('mysql');

const pool = createPool({
    host: "myapp2",
    user: "moeuser",
    password: "moepass",
    database: "progettoHackaton",
    connectionLimit: "10"
})


exports.getAllUsers = function getAllUsers() {
        pool.query(`Select * from Users`, (err, result, fields) =>{
            if(err) return console.log(err)
            res = result
            return console.log(result)
        })
}

exports.pool = pool

