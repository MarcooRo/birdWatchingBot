/***************************
 * OUR REMARK FROM THE BLOCK
 ***************************/

/***************************
 * FILTER UTILITY
 ***************************/
const version_1 = "1.0.0";
const version_2 = "2.0.0"; // we get only the V2 from the API looking in the block
const list = "LIST";
const buy = "BUY";
const mint = "MINT";
const baseCollection = "e0b9bdcc456a36497a";
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
const freeString = "" // campo di trak libero
const img = ""; // come trovare il Json?
const linkCatalogo = "https://kanaria.rmrk.app/catalogue/";
const linkIpfs = "https://rmrk.mypinata.cloud/ipfs/";
let linkCatalogoComp = "";
var freePrice = 0; // campo campo ha valore base 0 ma si deve poter riscrivere
//var freePrice = al valore di input della UI bot 
let addressSell = "..." // address di chi lista o vende
    //var remark = "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649::20000000000";


exports.buildMessage = function buildMessage(remark) {
    var remarkSplit = remark.split('::');
    var remarkObj = new Map([
        ["rmrk", remarkSplit[0]],
        ["interaction", remarkSplit[1]],
        ["version", remarkSplit[2]],
        ["nft", remarkSplit[3]],
        ["price", remarkSplit[4]]
    ]);
    var rmrkJson = Object.fromEntries(remarkObj);
    var remarkNft = rmrkJson.nft;
    linkCatalogoComp = linkCatalogo + remarkNft;

    var nftType = remarkNft.split('-');
    var nftTypeObj = new Map([
        ["nonServe", nftType[0]],
        ["vertionKanaria", nftType[1]],
        ["typeNFT", nftType[2]],
        ["typeRarity", nftType[3]],
        ["numberId", nftType[4]]
    ]);
    var nftTypJson = Object.fromEntries(nftTypeObj);
    var remarkPrice = rmrkJson.price / 950000000000;
    var remarkNft = rmrkJson.nft;
    var nftTypeOf = nftTypJson.typeNFT;
    var nftRarity = nftTypJson.typeRarity;
    var nftNid = nftTypJson.numberId;

    switch (nftRarity) {
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
    }

    const message = {
        nftType: nftTypeOf,
        nftGrade: nftRarytext,
        id: nftNid,
        price: remarkPrice,
        link: linkCatalogoComp,
        print: function() {
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

            }
            var toPrint = "<b>OMG!</b>\n\An <b>" + nome + "</b> has been listed\n\
            <b>" + text + "</b>\n\
            <b>" + this.nftGrade +"</b>\n\
            <b>Sale at: " + this.price + " KSM</b>\n\
            <a href='" + this.link + "'>Take a look -></a>\n\
            \n\
            <i>This is a beta version, bug will fix and more features coming soon</i>";
            console.log(toPrint)
            return toPrint; 
        }
    };
            return  message.print()
}

function checkFilter(rmrkJson, nftTypJson, filter) {
    var remarkRmrk = rmrkJson.rmrk;
    var remarkInteraction = rmrkJson.interaction;
    var remarkVersion = rmrkJson.version;
    var remarkPrice = rmrkJson.price / 950000000000;
    var remarkNft = rmrkJson.nft;

    var nftNonSo = nftTypJson.nonServe; // I don't know what is it
    var nftVertion = nftTypJson.vertionKanaria;
    var nftTypeOf = nftTypJson.typeNFT;
    var nftRarity = nftTypJson.typeRarity;
    var nftNid = nftTypJson.numberId;
    /***************************
     * BOT COMMAND
     ***************************/
    //inizializzare tutti i filtri in base alla variabile filter 
    let botList = filter[0]; // take true/false from bot inout
    let botBuy = filter[1]; // take true/false from bot inout
    let botKanbird = filter[2]; // take true/false from bot inout
    let botKanbirdSuperFounder = filter[3]; // take true/false from bot inout
    let botKanbirdFounder = filter[4]; // take true/false from bot inout
    let botKanbirdRare = filter[5]; // take true/false from bot inout
    let botKanbirdLimited = filter[6]; // take true/false from bot inout

    /***************************
     * MESSAGE LIST TO PRINT
     ***************************/

    switch (nftRarity) {
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
            break;
    }

    
    /***************************
     * FILTER LIST FOR KANARIA
     ***************************/
    // 1. LIST
    // List + price != 0, se il prezzo è 0 NFT è stato tolto dalla vendit
    if (remarkInteraction == list && remarkPrice > 0) {
        // from here pass only NFT list for sell

        return message.print();

        if (remarkPrice >= freePrice) {
            // mostrami solo gli elementi che siano superiori o inferiori a questo prezzo.
            // perchè mettere qui questo? perchè il valore prestabilito è 0.
            // se uno non imposta nulla questa condizione è sempre vera, altrimenti lavora a monte del filtraggio

            //Grupe of Birds
            if (nftTypeOf == kanbird) {
                // print all Kanaria Bird. NOTA questa condizione non va richiamata se impostato una speficla classe di rarita
                //message.print();
                //console.log(message.print());
                //console.log('1');
            }
            if (nftRarity == kanbirdSuperFounder) {
                // print only Kanaria Bird Super Founder
                //console.log(message.print());
                //console.log('2');
            }
            if (nftRarity == kanbirdFounder) {
                // print only Kanaria Bird Founder
                //console.log(message.print());
                //console.log('3');
            }
            if (nftRarity == kanbirdRare) {
                // print only Kanaria Bird Rare
                //console.log(message.print());
                //console.log('4');
            }
            if (nftRarity == kanbirdLimited) {
                // print only Kanaria Bird Limited Edition
                //console.log(message.print());
                //console.log('5');
            }

            // Grupe of Items
            if (nftTypeOf == kanBack) {
                // print backpack 
                //console.log(message.print());
                //console.log('6');
            }
            if (nftTypeOf == kanBg) {
                // print background
                //console.log(message.print());
                //console.log('7');
            }
            if (nftTypeOf == kanFrnt) {
                // print foreground
                //console.log(message.print());
            }
            if (nftTypeOf == kanHead) {
                // print headwear
                //console.log(message.print());
            }
            if (nftTypeOf == kanHand) {
                // print handheld
                //console.log(message.print());
            }
            if (nftTypeOf == kanChest) {
                // print necklace
                //console.log(message.print());
            }
            if (freeString == remarkNft) {
                // La stringa confronta con tutta la perte dell'url inerente nel campo libero
                //console.log(message.print());
                //console.log('8');
            }
            if (freeString == linkCatalogoComp) {
                // La stringa confronta tutto l'url
                //console.log(message.print());
                //console.log('9');
            }
            if (freeString == addressSell) {
                // La stringa confronta se un address ha listato qualche cosa
                //console.log(message.print());
                //console.log('10');
            }

        } // end Price

    } // end List
    //return del messaggio 
}