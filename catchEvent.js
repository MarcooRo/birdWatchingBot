import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToString } from "@polkadot/util";
import { getMessageGivenFilter } from './filter.js';


const provider = new WsProvider('wss://kusama-rpc.polkadot.io/');
const api = await ApiPromise.create({ provider });
const VERSION = "2.0.0";

export const getRemark = async function getRemark(hederNumber, filter) {
  const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  signedBlock.block.extrinsics.forEach((ex, index) => {
      if (ex.method.meta.name.toString() == "remark") {
          console.log(index+"----------", hexToString(ex.args.toString()));
          //altrimenti 
          // send(getMessageGivenFilter(hexToString(ex.args.toString(), filter))
          console.log("Messaggio da inviare ====="+getMessageGivenFilter(hexToString(ex.args.toString()), filter))
          return hexToString(ex.args.toString());
      }
  });
  return "";
}

export function botStart (filter) {
  (async () => {
  const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
        console.log("Blocco numero "+ header.number)
        getRemark(header.number, filter)
  });
})()
}

botStart()




