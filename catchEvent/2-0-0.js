//2-0-0
const messageCreator = require('./scriptUtils/2-0-0/messageCreator.js');
const sendMessage = require('./scriptUtils/2-0-0/sendMessage.js');
const filterUtils = require('./scriptUtils/2-0-0/filter.js')
let pool = require('./scriptUtils/2-0-0/Db.js')


exports.manage2_0_0 = function manage2_0_0() {
let message = messageCreator.buildMessage(remarks)
    if(message.price != 0) {
        let messageFilter = filterUtils.prepareFilterMesage(remarks)
        pool.pool.getConnection(function(err, connection) {
            pool.pool.query(`Select * from Users`, (err, result, fields) => {
                if(err) return console.log(err)
                console.log(remarks)
                for(let k in result) {
                    if(filterUtils.checkFilterMessage_User(messageFilter, result[k].filter, result[k].priceLimit))
                        sendMessage.sendPhoto(result[k].chatId.toString(), message, message.print())
                }
            })
            connection.release()
        })
    }
}
