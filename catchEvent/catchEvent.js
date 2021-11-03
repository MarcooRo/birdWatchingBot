const ApiPromise = require('@polkadot/api')
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const getMessageGivenFilter = require('./filter.js')
const sendMessage = require('./sendMessage.js');
const db = require('./Db.js')
const pool = require('./Db.js')

const getRemark = async function getRemark(api, hederNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    let users = await pool.pool.query( 'SELECT * FROM Users' )
    signedBlock.block.extrinsics.forEach((ex, index) => {
        if (ex.method.meta.name.toString() == "remark") {
            var remarks = hexToString.hexToString(ex.args.toString());
            // if (remarks.includes("2.0.0")) {
                let message = getMessageGivenFilter.buildMessage(remarks)
                    pool.pool.query(`Select * from Users`, (err, result, fields) =>{
                        if(err) return console.log(err)
                        for(let k in result){
                            //sendMessage.sendMessage(result[k].chatId.toString(), message)
                            console.log(message)
                        }
                    })
            // }

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