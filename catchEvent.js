import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToString } from "@polkadot/util";
const provider = new WsProvider('wss://kusama-rpc.polkadot.io/');
const api = await ApiPromise.create({ provider });

async function getRemark(hederNumber) {
  const blockHash = await api.rpc.chain.getBlockHash(hederNumber);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
    signedBlock.block.extrinsics.forEach((ex, index) => {
      if(ex.method.meta.name.toString() == "remark"){
        console.log(index, hexToString(ex.args.toString()));
        return  hexToString(ex.args.toString());
      }
    });
}

async function main () {
  const blockNumber = await api.rpc.chain.subscribeNewHeads((header) => {
        console.log("Blocco numero "+ header.number)
        getRemark(header.number)
  });
}

main().catch(console.error);




