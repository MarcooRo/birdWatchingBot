const ApiPromise = require('@polkadot/api')
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const messageCreator = require('./botUtils/messageCreator.js');


const getRemark = async function getRemark(api, hederNumber, channel) {
    const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    signedBlock.block.extrinsics.forEach((ex, index) => {
        if (ex.method.meta.name.toString() == "remark") {
            var remarks = hexToString.hexToString(ex.args.toString());
            if (remarks.includes("2.0.0")) { // get only LIST & 2.0.0
                let message = messageCreator.buildMessage(remarks)
                console.log(remarks)
                    if(remarks.includes("LIST")) channel.List.send({ embeds: [message] })
                    if(remarks.includes("BUY")) channel.Buy.send({ embeds: [message] })
             }
        }
    });
    return "";
}

exports.botStart = function botStart(channel) {
    (async() => {
        console.log("SCAN STARTED")
        const provider = new WsProvider.WsProvider('wss://kusama-rpc.polkadot.io/');
        const api = await ApiPromise.ApiPromise.create({ provider });
            const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
                console.log("Blocco numero " + header.number)
                getRemark(api, header.number, channel)
            });
    })()
}
