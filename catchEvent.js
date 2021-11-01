const ApiPromise = require('@polkadot/api')
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const getMessageGivenFilter = require('./filter.js')
const sendMessage = require('./bot/sendMessage.js');


const getRemark = async function getRemark(api, hederNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    signedBlock.block.extrinsics.forEach((ex, index) => {
        if (ex.method.meta.name.toString() == "remark") {
            var remarks = hexToString.hexToString(ex.args.toString());
            console.log(index + "----------", hexToString.hexToString(ex.args.toString()));
            if (remarks.includes("2.0.0")) {
                // prepara messaggio
                // 
                //sendMessage.sendMessage(chatId, getMessageGivenFilter.getMessageGivenFilter(remarks, filter))
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