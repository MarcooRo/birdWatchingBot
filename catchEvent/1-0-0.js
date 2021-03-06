//1-0-0
const messageCreator = require('./scriptUtils/1-0-0/messageCreator.js');
const sendMessage = require('./scriptUtils/1-0-0/sendMessage.js');
const filterUtils = require('./scriptUtils/1-0-0/filter.js')
let pool = require('./scriptUtils/1-0-0/Db.js')

// with this function we explore the remarks catched, and we create message, the filter of message
// with a query we fetch the filter inserted by user and a check is made for understaund if user want to receive this remark
exports.manage1_0_0 = function manage1_0_0(remarks) {
let message = messageCreator.buildMessage(remarks)
    if(message.price != 0) {
        let messageFilter = filterUtils.prepareFilterMesage(remarks)
        pool.pool.getConnection(function(err, connection) {
            pool.pool.query(`Select * from Users`, (err, result, fields) => {
                if(err) return console.log(err)
                console.log(remarks)
                for(let k in result) {
                    if(filterUtils.checkFilterMessage_User(messageFilter, result[k].filter, result[k].nftObject, result[k].nftCollection, result[k].priceLimit))
                    sendMessage.sendPhoto(result[k].chatId.toString(),message, message.print())
                }
            })
            connection.release()
        })
    }
}
