// import { ApiPromise, WsProvider } from '@polkadot/api';
// import { hexToString } from "@polkadot/util";
// import { getMessageGivenFilter } from './filter.js';

const ApiPromise  = require('@polkadot/api')
const WsProvider  = require('@polkadot/api')
const hexToString = require('@polkadot/util')
const getMessageGivenFilter = require('./filter.js')
const sendMessage = require('./bot-Telegram/sendMessage');


const getRemark = async function getRemark(api, hederNumber, filter) {
  const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  signedBlock.block.extrinsics.forEach((ex, index) => {
      if (ex.method.meta.name.toString() == "remark") {
          console.log(index+"----------", hexToString.hexToString(ex.args.toString()));
          sendMessage.sendMessage("1238654632",getMessageGivenFilter.getMessageGivenFilter(hexToString.hexToString(ex.args.toString()), filter))

      }
  });
  return "";
}

exports.BotStart =  function botStart (on, filter) {
  (async () => {
    console.log("SCANSIONE EVENTI AVVIATA")
    const provider = new WsProvider.WsProvider('wss://kusama-rpc.polkadot.io/');
    const api = await ApiPromise.ApiPromise.create({ provider });
    const VERSION = "2.0.0";
    if(on){
      const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
            console.log("Blocco numero "+ header.number)
            getRemark(api, header.number, filter)
      });
    }else{
      return;
    }
  })()
}




