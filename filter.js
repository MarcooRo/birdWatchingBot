/***************************
 * OUR REMARK FROM THE BLOCK
 ***************************/
var remark = "RMRK::LIST::1.0.0::8949162-e0b9bdcc456a36497a-KANBIRD-KANS-00000001::10000000000";

var remarkSplit = remark.split('::');
//console.log(remarkSplit);
var remarkObj = new Map([
    ["rmrk", remarkSplit[0]],
    ["interaction", remarkSplit[1]],
    ["version", remarkSplit[2]],
    ["nft", remarkSplit[3]],
    ["price", remarkSplit[4]]
]);
//console.log(remarkObj);
var rmrkJson = Object.fromEntries(remarkObj);
console.log(rmrkJson);
var remarkRmrk = rmrkJson.rmrk;
var remarkInteraction = rmrkJson.interaction;
var remarkVersion = rmrkJson.version;
var remarkNft = rmrkJson.nft;
var remarkPrice = rmrkJson.price;

/***************************
 * ESPLODE NFT TYPE
 ***************************/
var nftType = remarkNft.split('-');
//console.log(nftType);
var nftTypeObj = new Map([
    ["nonServe", nftType[0]],
    ["vertionKanaria", nftType[1]],
    ["typeNFT", nftType[2]],
    ["typeRarity", nftType[3]],
    ["numberId", nftType[4]]
]);
//console.log(nftTypeObj);
var nftTypJson = Object.fromEntries(nftTypeObj);
console.log(nftTypJson);
var nftNonSo = nftTypJson.nonServe; // I don't know what is it
var nftVertion = nftTypJson.vertionKanaria;
var nftTypeOf = nftTypJson.typeNFT;
var nftRarity = nftTypJson.typeRarity;
var nftNid = nftTypJson.numberId;


/***************************
 * FILTER UTILITY
 ***************************/
const version_1 = "1.0.0";
const version_2 = "2.0.0"; // we get only the V2 from the API looking in the block
const List = "LIST";
const Buy = "BUY";
const Mint = "MINT";
const XXX = "e0b9bdcc456a36497a";
const Kanbird = "KANBIRD";
const KanbirdSuperFounder = "KANS";
const KanbirdFounder = "KANF";
const KanbirdRare = "KANR";
const KanbirdLimited = "KANL";
const KanBack = "KANBACK";
const KanBg = "KANBG";
const KanFrnt = "KANFRNT";
const KanHead = "KANHEAD";
const KanHand = "KANHAND";
const KanChest = "KANCHEST";
const Img = ""; // come trovare il Json?
const linkCatalogo = "https://kanaria.rmrk.app/catalogue/";
const linkIpfs = "https://rmrk.mypinata.cloud/ipfs/";


/***************************
 * MESSAGE LIST TO PRINT
 ***************************/

const message = {
    nftType: nftTypeOf,
    nftGrade: nftRarity,
    id: nftNid,
    price: remarkPrice,
    link: linkCatalogo + remarkNft,
    print: function() {
        switch (this.nftType) {
            case Kanbird:
                var nome = "Kanaria Bird";
                var text = "Si tratta del N°" + this.id + " Classe rarità: " + this.nftGrade;
                break;
            case KanBack:
                var nome = "Backgournd";
                var text = "Si tratta del N°" + this.id;
                break;
        }
        var toPrint = "<p>Attenzione un " + nome + " è stato messo in vendità</p> \
                        <p>" + text + "</p> \
                        <p>Al prezzo di " + this.price + "</p> \
                        <a href='" + this.link + "'>Guarda!</a>";

        return toPrint
    }
};



/***************************
 * FILTER LIST FOR KANARIA
 ***************************/
// 1. LIST
// List + price != 0, se il prezzo è 0 NFT è stato tolto dalla vendita

if (remarkInteraction == List && remarkPrice > 0) {
    // from here pass only NFT list for sell

    if (nftTypeOf == Kanbird) {
        // print all Kanaria Bird
        //message.print();
        console.log(message.print());

    }
    if (nftRarity == KanbirdSuperFounder) {
        // print only Kanaria Bird Super Founder
    }
    if (nftRarity == KanbirdFounder) {
        // print only Kanaria Bird Founder
    }
    if (nftRarity == KanbirdRare) {
        // print only Kanaria Bird Rare
    }
    if (nftRarity == KanbirdLimited) {
        // print only Kanaria Bird Limited Edition
    }

}