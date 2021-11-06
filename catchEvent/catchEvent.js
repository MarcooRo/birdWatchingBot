const ApiPromise = require('@polkadot/api')
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const filterUtils = require('./scriptUtils/filter.js')
const sendMessage = require('./scriptUtils/sendMessage.js');
const messageCreator = require('./scriptUtils/messageCreator.js');
let pool = require('./scriptUtils/Db.js')


const getRemark = async function getRemark(api, hederNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    signedBlock.block.extrinsics.forEach((ex, index) => {
        if (ex.method.meta.name.toString() == "remark") {
            var remarks = hexToString.hexToString(ex.args.toString());
            if (remarks.includes("2.0.0") && remarks.includes("LIST")) {
                let message = messageCreator.buildMessage(remarks)
                let messageFilter = filterUtils.prepareFilterMesage(remarks)
                pool.pool.query(`Select * from Users`, (err, result, fields) =>{
                    if(err) return console.log(err)
                    console.log(remarks)
                    for(let k in result) {
                            if(filterUtils.checkFilterMessage_User(messageFilter, result[k].filter))
                                sendMessage.sendPhoto(result[k].chatId.toString(), message.reamrkId, message.print())
                    }
                })
             }
        }
    });
    return "";
}

function botStart() {
    (async() => {
        console.log("SCANSIONE EVENTI AVVIATA")
        const provider = new WsProvider.WsProvider('wss://kusama-rpc.polkadot.io/');
        const api = await ApiPromise.ApiPromise.create({ provider });
        const VERSION = "2.0.0";
            const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
                console.log("Blocco numero " + header.number)
                getRemark(api, header.number)
            });
    })()
}

botStart()