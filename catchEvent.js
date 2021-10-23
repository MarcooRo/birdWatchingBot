const ApiPromise  = require('@polkadot/api')
const WsProvider  = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const getMessageGivenFilter = require('./filter.js')
const sendMessage = require('./bot/sendMessage');


const getRemark = async function getRemark(chatId, api, hederNumber, filter) {
  const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  signedBlock.block.extrinsics.forEach((ex, index) => {
      if (ex.method.meta.name.toString() == "remark") {
          let remarks = hexToString.hexToString(ex.args.toString());
          console.log(index+"----------", remarks);
          if(remarks.includes("2.0.0"))sendMessage.sendMessage(chatId, getMessageGivenFilter.getMessageGivenFilter(remarks, filter))
      }
  });
  return "";
}

exports.BotStart =  function botStart (chatId, on, filter) {
  (async () => {
    console.log("SCANSIONE EVENTI AVVIATA")
    const provider = new WsProvider.WsProvider('wss://kusama-rpc.polkadot.io/');
    const api = await ApiPromise.ApiPromise.create({ provider });
    const VERSION = "2.0.0";
    if(on){
      const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
            console.log("Blocco numero "+ header.number)
            getRemark(chatId, api, header.number, filter)
      });
    }else{
      return;
    }
  })()
}




