let dumpKANCHEST = require('./dumpbuild/CollectionsDump/KANCHEST.json');
let dumpKANBACK = require('./dumpbuild/CollectionsDump/KANBACK.json');
let dumpKANBG = require('./dumpbuild/CollectionsDump/KANBG.json');
let dumpKANHAND = require('./dumpbuild/CollectionsDump/KANHAND.json');
let dumpKANHEAD = require('./dumpbuild/CollectionsDump/KANHEAD.json');
let dumpEVNTS = require('./dumpbuild/CollectionsDump/EVNTS.json');


/***************************
 * FILTER UTILITY
 ***************************/
//const version_2 = "2.0.0"; // we get only the V2 from the API looking in the block
const list = "LIST";
const buy = "BUY";
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
//const linkIpfs = "https://rmrk.mypinata.cloud/ipfs/";
var freePrice = 0; // campo campo ha valore base 0 ma si deve poter riscrivere
//ES di remerk --> "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649::20000000000";
// 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649::20000000000";
// 8788624-e0b9bdcc456a36497a-KANBG-var1_background-00004594
// 8788594-e0b9bdcc456a36497a-KANHAND-1fa93_objectleft-00000066
// 9807302-e0b9bdcc456a36497a-EVNTS-BNCHST-00000017


exports.buildMessage = function buildMessage(remark) {
    var remarkSplit = remark.split('::');
    var remarkObj = new Map([
        ["interaction", remarkSplit[1]], // LIST - BUY
        ["nft", remarkSplit[3]], // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
        ["price", remarkSplit[4]] // 20000000000
    ]);
    var rmrkJson = Object.fromEntries(remarkObj);
    var remarkNft = rmrkJson.nft; // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
    let linkCatalogoComp = linkCatalogo + remarkNft; // link to the page 

    var nftType = remarkNft.split('-');
    var nftTypeObj = new Map([
        ["typeNFT", nftType[2]], // KANBIRD, KANBG, EVNTS
        ["typeRarity", nftType[3]], // KANL, KANS, var1_background, 1fa93_objectleft, BNCHST
        ["numberId", nftType[4]] // 00004594, 00000066, 00000017
    ]);
    var nftTypJson = Object.fromEntries(nftTypeObj);
    var remarkPrice = rmrkJson.price / 1000000000000;

    switch (nftTypJson.typeNFT) {
        case 'KANBACK':
            var imgDump = dumpKANBACK[`${remarkNft}`].thumb;
            break;
        case 'KANFRNT':
            var imgDump = dumpKANFRNT[`${remarkNft}`].thumb;
            break;
        case 'KANBG':
            var imgDump = dumpKANBG[`${remarkNft}`].thumb;
            break;
        case 'KANHEAD':
            var imgDump = dumpKANHEAD[`${remarkNft}`].thumb;
            break;
        case 'KANHAND':
            var imgDump = dumpKANHAND[`${remarkNft}`].thumb;
            break;
        case 'KANCHEST':
            var imgDump = dumpKANCHEST[`${remarkNft}`].thumb;
            break;
        case 'EVNTS':
            var imgDump = dumpEVNTS[`${remarkNft}`].thumb;
            break;
        default:
            var imgDump = "https://rmrk.mypinata.cloud/ipfs/QmWS1jXv8B8smQotmtpHkkYkvUma4dmTVGDYAtCuEtNMR3"
    }

    var thumb = imgDump.split('/');
    thumb = thumb[thumb.length - 2] + "/" + thumb[thumb.length - 1];

    switch (nftTypJson.typeRarity) {
        case kanbirdSuperFounder:
            var nftRarytext = "Super Founder";
            break;
        case kanbirdFounder:
            var nftRarytext = "Founder";
            break;
        case kanbirdRare:
            var nftRarytext = "Rare";
            break;
        case kanbirdLimited:
            var nftRarytext = "Limited edition";
        default:
            var nftRarytext = "Limited edition";
    }

    const message = {
        imgSRC: "https://bafybeia54q2hszfmfxctlpalu5sv4tmus3ry4h3xs255b52sumdktvkcqe.ipfs.dweb.link/" + thumb,
        nftType: nftTypJson.typeNFT,
        nftGrade: nftRarytext,
        id: nftTypJson.numberId,
        price: remarkPrice,
        link: linkCatalogoComp,
        print: function() {
            ////console.log(this.nftType)
            switch (this.nftType) {
                case kanbird:
                    var nome = "Kanaria Bird";
                    var text = "Rarity: " + this.nftGrade + " N°" + this.id;
                    break;
                case kanBack:
                    var nome = "Backpack";
                    var text = "N°" + this.id;
                    break;
                case kanBg:
                    var nome = "Backgournd";
                    var text = "N°" + this.id;
                    break;
                case kanFrnt:
                    var nome = "Foreground";
                    var text = "N°" + this.id;
                    break;
                case kanHead:
                    var nome = "Headwear";
                    var text = "N°" + this.id;
                    break;
                case kanHand:
                    var nome = "Handheld";
                    var text = "N°" + this.id;
                    break;
                case kanChest:
                    var nome = "Necklace";
                    var text = "N°" + this.id;
                    break;
                case Evnts:
                    var nome = "Events Items";
                    var text = "N°" + this.id;
                    break;
                default:
                    var nome = "Something";
                    var text = "";
            }
            var toPrint = "<b>OMG!</b>\n\An <b>" + nome + "</b> has been listed\n\
<b>" + text + "</b>\n\
<b>Sale at: " + this.price + " KSM</b>\n\
<a href='" + this.link + "'>Take a look -></a>\n\
\n\
<i>This is a beta version, bug will fix and more features coming soon</i>";

            return toPrint;
        }
    };
    console.log(message.print)
    return message.print()
}


function checkFilter(rmrkJson, nftTypJson, filter) {

    var remarkInteraction = rmrkJson.interaction; // BUY o LIST
    //var remarkVersion = rmrkJson.version; // 2.0.0
    var remarkPrice = rmrkJson.price / 1000000000000; // prezzo
    var remarkNft = rmrkJson.nft; //

    //var nftVertion = nftTypJson.vertionKanaria; // collezione
    var nftTypeOf = nftTypJson.typeNFT; // KANBIRD, KANBG, EVNTS
    var nftRarity = nftTypJson.typeRarity; // KANL, KANS, var1_background, 1fa93_objectleft, BNCHST
    //var nftNid = nftTypJson.numberId; 

    /***************************
     * FILTER LIST FOR KANARIA
     ***************************/

    // 1. LIST
    // List + price != 0, se il prezzo è 0 NFT è stato tolto dalla vendit
    if (remarkInteraction == list && remarkPrice > 0) {
        // from here pass only NFT list for sell
        filter.List = 1;

        if (remarkPrice >= freePrice) {
            // mostrami solo gli elementi che siano superiori o inferiori a questo prezzo.
            // se uno non imposta nulla questa condizione è sempre vera, altrimenti lavora a monte del filtraggio

            //Grupe of Birds
            if (nftTypeOf == kanbird) {
                // print all Kanaria Bird. NOTA questa condizione non va richiamata se impostato una speficla classe di rarita
                filter.allBirds = 1;
            }
            if (nftRarity == kanbirdSuperFounder) {
                // print only Kanaria Bird Super Founder
                filter.SuperFunder = 1;
            }
            if (nftRarity == kanbirdFounder) {
                // print only Kanaria Bird Founder
                filter.Funder = 1;
            }
            if (nftRarity == kanbirdRare) {
                // print only Kanaria Bird Rare
                filter.Rare = 1;
            }
            if (nftRarity == kanbirdLimited) {
                // print only Kanaria Bird Limited Edition
                filter.Limited = 1;
            }

            // Grupe of Items
            if (nftTypeOf == kanBack) {
                // print backpack 
                filter.BackPack = 1;
            }
            if (nftTypeOf == kanBg) {
                // print background
                filter.Background = 1;
            }
            if (nftTypeOf == kanFrnt) {
                // print foreground
                filter.Foreground = 1;
            }
            if (nftTypeOf == kanHead) {
                // print headwear
                filter.Headwear = 1;
            }
            if (nftTypeOf == kanHand) {
                // print handheld
                filter.Handheld = 1;
            }
            if (nftTypeOf == kanChest) {
                // print necklace
                filter.Necklace = 1;
            }
            if (nftTypeOf == kanChest) {
                // print necklace
                filter.Necklace = 1;
            }

            if (nftTypeOf = "EVNTS") {

                var eventItems = dumpEVNTS[`${remarkNft}`].slot;
                eventItems.split('.');
                eventItems[eventItems.length - 1];

                switch (eventItems) {
                    case backpack:
                        filter.BackPack = 1;
                        break;
                    case background:
                        filter.Background = 1;
                        break;
                    case foreground:
                        filter.Foreground = 1;
                        break;
                    case headwear:
                        filter.Headwear = 1;
                        break;
                    case objectleft:
                        filter.Handheld = 1;
                        break;
                    case necklace:
                        filter.Necklace = 1;
                        break;
                    default:
                        filter.List = 1;
                }

            }

        } // end Price

    } // end List

    // 1. BUY
    if (remarkInteraction == buy && remarkPrice > 0) {
        // from here pass only NFT list for sell
        filter.Buy = 1;

        if (remarkPrice >= freePrice) {
            // mostrami solo gli elementi che siano superiori o inferiori a questo prezzo.
            // se uno non imposta nulla questa condizione è sempre vera, altrimenti lavora a monte del filtraggio

            //Grupe of Birds
            if (nftTypeOf == kanbird) {
                // print all Kanaria Bird. NOTA questa condizione non va richiamata se impostato una speficla classe di rarita
                filter.allBirds = 1;
            }
            if (nftRarity == kanbirdSuperFounder) {
                // print only Kanaria Bird Super Founder
                filter.SuperFunder = 1;
            }
            if (nftRarity == kanbirdFounder) {
                // print only Kanaria Bird Founder
                filter.Funder = 1;
            }
            if (nftRarity == kanbirdRare) {
                // print only Kanaria Bird Rare
                filter.Rare = 1;
            }
            if (nftRarity == kanbirdLimited) {
                // print only Kanaria Bird Limited Edition
                filter.Limited = 1;
            }

            // Grupe of Items
            if (nftTypeOf == kanBack) {
                // print backpack 
                filter.BackPack = 1;
            }
            if (nftTypeOf == kanBg) {
                // print background
                filter.Background = 1;
            }
            if (nftTypeOf == kanFrnt) {
                // print foreground
                filter.Foreground = 1;
            }
            if (nftTypeOf == kanHead) {
                // print headwear
                filter.Headwear = 1;
            }
            if (nftTypeOf == kanHand) {
                // print handheld
                filter.Handheld = 1;
            }
            if (nftTypeOf == kanChest) {
                // print necklace
                filter.Necklace = 1;
            }
            if (nftTypeOf == kanChest) {
                // print necklace
                filter.Necklace = 1;
            }

            if (nftTypeOf = "EVNTS") {

                var eventItems = dumpEVNTS[`${remarkNft}`].slot;
                eventItems.split('.');
                eventItems[eventItems.length - 1];

                switch (eventItems) {
                    case backpack:
                        filter.BackPack = 1;
                        break;
                    case background:
                        filter.Background = 1;
                        break;
                    case foreground:
                        filter.Foreground = 1;
                        break;
                    case headwear:
                        filter.Headwear = 1;
                        break;
                    case objectleft:
                        filter.Handheld = 1;
                        break;
                    case necklace:
                        filter.Necklace = 1;
                        break;
                    default:
                        filter.List = 1;
                }

            }

        } // end Price

    } // end BUY
}