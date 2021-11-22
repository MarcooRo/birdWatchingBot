const ApiPromise = require('@polkadot/api')
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const manage2_0_0 = require('./2-0-0.js')
const manage1_0_0 = require('./1-0-0.js')
const channel = require('./discordBot.js')
const manageDiscord = require('./manageDiscord.js')

const getRemark = async function getRemark(api, hederNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    signedBlock.block.extrinsics.forEach((ex, index) => {  
        if (ex.method.meta.name.toString() == "remark") {
            var remarks = hexToString.hexToString(ex.args.toString());
            console.log(remarks)
            manageDiscord.manageDiscord(remarks, channel)
            if (remarks.includes("2.0.0") && remarks.includes("LIST")) {
                manage2_0_0.manage2_0_0(remarks)
            }
            if (remarks.includes("1.0.0") && remarks.includes("LIST")) {
                manage1_0_0.manage1_0_0(remarks)
            }
        }
    });
}

function botStart() {
    (async() => {
        console.log("SCAN STARTED")
        const provider = new WsProvider.WsProvider('wss://kusama-rpc.polkadot.io/');
        const api = await ApiPromise.ApiPromise.create({ provider });
            const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
                console.log("Blocco numero " + header.number)
                getRemark(api, header.number)
            });
    })()
}

botStart()