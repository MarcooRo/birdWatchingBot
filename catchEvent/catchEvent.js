const ApiPromise = require('@polkadot/api')
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const getMessageGivenFilter = require('./scriptUtils/filter.js')
const sendMessage = require('./scriptUtils/sendMessage.js');
const {db, pool} = require('./scriptUtils/Db.js')



function sendToAll(remarks){
    let message = getMessageGivenFilter.buildMessage(remarks)
    pool.pool.query(`Select * from Users`, (err, result, fields) =>{
        if(err) return console.log(err)
        console.log(remarks)
        
        for(let k in result){
            console.log(result[k].chatId.toString())
            console.log(message.imgSRC)
            console.log(message.print())
            sendMessage.sendPhoto(result[k].chatId.toString(), message.imgSRC, message.print())
        }
    })
}

const getRemark = async function getRemark(api, hederNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    signedBlock.block.extrinsics.forEach((ex, index) => {
        if (ex.method.meta.name.toString() == "remark") {
            var remarks = hexToString.hexToString(ex.args.toString());
            if (remarks.includes("2.0.0") && remarks.includes("LIST")) {
                sendToAll(remarks)
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