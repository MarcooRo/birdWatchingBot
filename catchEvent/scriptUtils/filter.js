let dumpKANCHEST = require('../dumpbuild/CollectionsDump/KANCHEST.json');
let dumpKANBACK = require('../dumpbuild/CollectionsDump/KANBACK.json');
let dumpKANBG = require('../dumpbuild/CollectionsDump/KANBG.json');
let dumpKANHAND = require('../dumpbuild/CollectionsDump/KANHAND.json');
let dumpKANHEAD = require('../dumpbuild/CollectionsDump/KANHEAD.json');
let dumpEVNTS = require('../dumpbuild/CollectionsDump/EVNTS.json');
let dumpKANFRNT = require ('../dumpbuild/CollectionsDump/KANFRNT.json');

// toDo: replace string variables with value slot in dump
const kanbird = "KANBIRD";
const kanbirdSuperFounder = "KANS";
const kanbirdFounder = "KANF";
const kanbirdRare = "KANR";
const kanbirdLimited = "KANL";
const kanBack = "KANBACK";
const kanBg = "KANBG";
const kanFrnt = "KANFRNT";
const kanHead = "KANHEAD";
const kanHand = "KANHAND";
const kanChest = "KANCHEST";
const Evnts = "EVNTS"
const linkCatalogo = "https://kanaria.rmrk.app/catalogue/";
var freePrice = 0; 

exports.prepareFilterMesage = function prepareFilterMesage(remark) {
    let Filter = {
        "allList": 0,
        "allBird": 0,
        "SuperFunder": 0,
        "Funder": 0,
        "Rare": 0,
        "Limited" : 0,
        "BackPack" : 0,
        "Background" : 0,
        "ForeGround" : 0,
        "Headwear" : 0,
        "Handheld" :0,
        "Necklace" : 0,
        "isBird" : 0
    }
    // toDo: add price
    // toDo: add switch per cercare info slot in EVNTS

    if(remark.includes(kanbirdSuperFounder))Filter.SuperFunder = 1
    if(remark.includes(kanbirdFounder))Filter.Funder = 1
    if(remark.includes(kanbirdRare))Filter.Rare = 1
    if(remark.includes(kanbirdLimited))Filter.Limited =1
    if(remark.includes(kanBack))Filter.BackPack = 1
    if(remark.includes(kanBg))Filter.Background = 1
    if(remark.includes(kanFrnt))Filter.ForeGround = 1
    if(remark.includes(kanHead))Filter.Headwear = 1
    if(remark.includes(kanHand))Filter.Handheld = 1
    if(remark.includes(kanChest))Filter.Necklace = 1
    if(remark.includes(kanbird)) Filter.isBird = 1

    let stringFilter= ''
    for(key in Filter)stringFilter += (Filter[key]);
    return stringFilter
}
//domani
exports.checkFilterMessage_User = function checkFilterMessage_User(filterMessage, filterUser, priceLimit) {
        if(filterUser[0])return true // all 
        if(filterUser.allBird && filterMessage.isBird) return true // only Kanaria Bird
        for(let i = 2; i < filterMessage.length-1; i++) { // itmes 
            if(filterUser[i]){
                if(!filterMessage[i])return false
            }
        }
        return true
}

// function checkFilter(remark) {
//     var remarkSplit = remark.split('::');
//     var remarkObj = new Map([
//         ["interaction", remarkSplit[1]], // LIST - BUY
//         ["nft", remarkSplit[3]], // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
//         ["price", remarkSplit[4]] // 20000000000
//     ]);
//     var rmrkJson = Object.fromEntries(remarkObj);
//     var remarkNft = rmrkJson.nft; // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
//     let linkCatalogoComp = linkCatalogo + remarkNft; // link to the page 

//     var nftType = remarkNft.split('-');
//     var nftTypeObj = new Map([
//         ["typeNFT", nftType[2]], // KANBIRD, KANBG, EVNTS
//         ["typeRarity", nftType[3]], // KANL, KANS, var1_background, 1fa93_objectleft, BNCHST
//         ["numberId", nftType[4]] // 00004594, 00000066, 00000017
//     ]);
//     var nftTypJson = Object.fromEntries(nftTypeObj);
//     var remarkInteraction = rmrkJson.interaction; // BUY o LIST
//     //var remarkVersion = rmrkJson.version; // 2.0.0
//     var remarkPrice = rmrkJson.price / 1000000000000; // prezzo
//     var remarkNft = rmrkJson.nft; //

//     //var nftVertion = nftTypJson.vertionKanaria; // collezione
//     var nftTypeOf = nftTypJson.typeNFT; // KANBIRD, KANBG, EVNTS
//     var nftRarity = nftTypJson.typeRarity; // KANL, KANS, var1_background, 1fa93_objectleft, BNCHST
//     //var nftNid = nftTypJson.numberId; 

//     /***************************
//      * FILTER LIST FOR KANARIA
//      ***************************/

//     // 1. LIST
//     // List + price != 0, se il prezzo è 0 NFT è stato tolto dalla vendit
//     if (remarkInteraction == list && remarkPrice > 0) {
//         // from here pass only NFT list for sell
//         filter.List = 1;

//         if (remarkPrice >= freePrice) {
//             // mostrami solo gli elementi che siano superiori o inferiori a questo prezzo.
//             // se uno non imposta nulla questa condizione è sempre vera, altrimenti lavora a monte del filtraggio

//             //Grupe of Birds
//             if (nftTypeOf == kanbird) {
//                 // print all Kanaria Bird. NOTA questa condizione non va richiamata se impostato una speficla classe di rarita
//                 filter.allBirds = 1;
//             }
//             if (nftRarity == kanbirdSuperFounder) {
//                 // print only Kanaria Bird Super Founder
//                 filter.SuperFunder = 1;
//             }
//             if (nftRarity == kanbirdFounder) {
//                 // print only Kanaria Bird Founder
//                 filter.Funder = 1;
//             }
//             if (nftRarity == kanbirdRare) {
//                 // print only Kanaria Bird Rare
//                 filter.Rare = 1;
//             }
//             if (nftRarity == kanbirdLimited) {
//                 // print only Kanaria Bird Limited Edition
//                 filter.Limited = 1;
//             }

//             // Grupe of Items
//             if (nftTypeOf == kanBack) {
//                 // print backpack 
//                 filter.BackPack = 1;
//             }
//             if (nftTypeOf == kanBg) {
//                 // print background
//                 filter.Background = 1;
//             }
//             if (nftTypeOf == kanFrnt) {
//                 // print foreground
//                 filter.Foreground = 1;
//             }
//             if (nftTypeOf == kanHead) {
//                 // print headwear
//                 filter.Headwear = 1;
//             }
//             if (nftTypeOf == kanHand) {
//                 // print handheld
//                 filter.Handheld = 1;
//             }
//             if (nftTypeOf == kanChest) {
//                 // print necklace
//                 filter.Necklace = 1;
//             }
//             if (nftTypeOf == kanChest) {
//                 // print necklace
//                 filter.Necklace = 1;
//             }

//             if (nftTypeOf = "EVNTS") {

//                 var eventItems = dumpEVNTS[`${remarkNft}`].slot;
//                 eventItems.split('.');
//                 eventItems[eventItems.length - 1];

//                 switch (eventItems) {
//                     case backpack:
//                         filter.BackPack = 1;
//                         break;
//                     case background:
//                         filter.Background = 1;
//                         break;
//                     case foreground:
//                         filter.Foreground = 1;
//                         break;
//                     case headwear:
//                         filter.Headwear = 1;
//                         break;
//                     case objectleft:
//                         filter.Handheld = 1;
//                         break;
//                     case necklace:
//                         filter.Necklace = 1;
//                         break;
//                     default:
//                         filter.List = 1;
//                 }

//             }

//         } // end Price

//     } // end List

//     // 1. BUY
//     if (remarkInteraction == buy && remarkPrice > 0) {
//         // from here pass only NFT list for sell
//         filter.Buy = 1;

//         if (remarkPrice >= freePrice) {
//             // mostrami solo gli elementi che siano superiori o inferiori a questo prezzo.
//             // se uno non imposta nulla questa condizione è sempre vera, altrimenti lavora a monte del filtraggio

//             //Grupe of Birds
//             if (nftTypeOf == kanbird) {
//                 // print all Kanaria Bird. NOTA questa condizione non va richiamata se impostato una speficla classe di rarita
//                 filter.allBirds = 1;
//             }
//             if (nftRarity == kanbirdSuperFounder) {
//                 // print only Kanaria Bird Super Founder
//                 filter.SuperFunder = 1;
//             }
//             if (nftRarity == kanbirdFounder) {
//                 // print only Kanaria Bird Founder
//                 filter.Funder = 1;
//             }
//             if (nftRarity == kanbirdRare) {
//                 // print only Kanaria Bird Rare
//                 filter.Rare = 1;
//             }
//             if (nftRarity == kanbirdLimited) {
//                 // print only Kanaria Bird Limited Edition
//                 filter.Limited = 1;
//             }

//             // Grupe of Items
//             if (nftTypeOf == kanBack) {
//                 // print backpack 
//                 filter.BackPack = 1;
//             }
//             if (nftTypeOf == kanBg) {
//                 // print background
//                 filter.Background = 1;
//             }
//             if (nftTypeOf == kanFrnt) {
//                 // print foreground
//                 filter.Foreground = 1;
//             }
//             if (nftTypeOf == kanHead) {
//                 // print headwear
//                 filter.Headwear = 1;
//             }
//             if (nftTypeOf == kanHand) {
//                 // print handheld
//                 filter.Handheld = 1;
//             }
//             if (nftTypeOf == kanChest) {
//                 // print necklace
//                 filter.Necklace = 1;
//             }
//             if (nftTypeOf == kanChest) {
//                 // print necklace
//                 filter.Necklace = 1;
//             }

//             if (nftTypeOf = "EVNTS") {

//                 var eventItems = dumpEVNTS[`${remarkNft}`].slot;
//                 eventItems.split('.');
//                 eventItems[eventItems.length - 1];

//                 switch (eventItems) {
//                     case backpack:
//                         filter.BackPack = 1;
//                         break;
//                     case background:
//                         filter.Background = 1;
//                         break;
//                     case foreground:
//                         filter.Foreground = 1;
//                         break;
//                     case headwear:
//                         filter.Headwear = 1;
//                         break;
//                     case objectleft:
//                         filter.Handheld = 1;
//                         break;
//                     case necklace:
//                         filter.Necklace = 1;
//                         break;
//                     default:
//                         filter.List = 1;
//                 }

//             }

//         } // end Price

//     } // end BUY
// }