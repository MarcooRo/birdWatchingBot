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

exports.getMessageGivenFilter = function getMessageGivenFilter(remark, filter) {
    addressSell = "..." // address di chi lista o vende

    //RMRK::LIST::2.0.0::8788607-e0b9bdcc456a36497a-KANBG-1f303_background-00000023
    //https://kanaria.rmrk.app/catalogue/8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649

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
    var remarkNft = rmrkJson.nft;
    linkCatalogoComp = linkCatalogo + remarkNft;

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
    return checkFilter(rmrkJson, nftTypJson, filter)
}





function checkFilter(rmrkJson, nftTypJson, filter) {
    var remarkRmrk = rmrkJson.rmrk;
    var remarkInteraction = rmrkJson.interaction;
    var remarkVersion = rmrkJson.version;
    var remarkPrice = rmrkJson.price / 100000000000;
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
    let botList = true; // take true/false from bot inout
    let botBuy = true; // take true/false from bot inout
    let botKanbird = true; // take true/false from bot inout
    let botKanbirdSuperFounder = true; // take true/false from bot inout
    let botKanbirdFounder = true; // take true/false from bot inout
    let botKanbirdRare = true; // take true/false from bot inout
    let botKanbirdLimited = true; // take true/false from bot inout


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

    const message = {
        nftType: nftTypeOf,
        nftGrade: nftRarytext,
        id: nftNid,
        price: remarkPrice,
        link: linkCatalogoComp,
        print: function() {
            console.log(this.nftType)
            switch (this.nftType) {
                case kanbird:
                    var nome = "Kanaria Bird";
                    var text = "This is the N°" + this.id + " Rarity class: " + this.nftGrade;
                    break;
                case kanBack:
                    var nome = "backpack";
                    var text = "This is the N°" + this.id;
                    break;
                case kanBg:
                    var nome = "Backgournd";
                    var text = "This is the N°" + this.id;
                    break;
                case kanFrnt:
                    var nome = "foreground";
                    var text = "This is the N°" + this.id;
                    break;
                case kanHead:
                    var nome = "headwear";
                    var text = "This is the N°" + this.id;
                    break;
                case kanHand:
                    var nome = "handheld";
                    var text = "This is the N°" + this.id;
                    break;
                case kanChest:
                    var nome = "necklace";
                    var text = "This is the N°" + this.id;
                    break;

            }
            var toPrint = "<b>OMG!</b>\n\<b>An " + nome + " was put up for sale</b>\n\
<pre>" + text + "</pre> \n \
<pre>At the price of " + this.price + "KSM</pre>\n \
<a href='" + this.link + "'>Get it first -></a>\n \
\n \
\n \
<i>This is a beta version. More features coming soon</i>";

            return toPrint;
        }
    };

    return message.print();
    /***************************
     * FILTER LIST FOR KANARIA
     ***************************/
    // 1. LIST
    // List + price != 0, se il prezzo è 0 NFT è stato tolto dalla vendita

    if (remarkInteraction == list && remarkPrice > 0) {
        // from here pass only NFT list for sell

        if (remarkPrice >= freePrice) {
            // mostrami solo gli elementi che siano superiori o inferiori a questo prezzo.
            // perchè mettere qui questo? perchè il valore prestabilito è 0.
            // se uno non imposta nulla questa condizione è sempre vera, altrimenti lavora a monte del filtraggio

            //Grupe of Birds
            if (nftTypeOf == kanbird) {
                // print all Kanaria Bird. NOTA questa condizione non va richiamata se impostato una speficla classe di rarita
                //message.print();
                console.log(message.print());
                console.log('1');
            }
            if (nftRarity == kanbirdSuperFounder) {
                // print only Kanaria Bird Super Founder
                console.log(message.print());
                console.log('2');
            }
            if (nftRarity == kanbirdFounder) {
                // print only Kanaria Bird Founder
                console.log(message.print());
                console.log('3');
            }
            if (nftRarity == kanbirdRare) {
                // print only Kanaria Bird Rare
                console.log(message.print());
                console.log('4');
            }
            if (nftRarity == kanbirdLimited) {
                // print only Kanaria Bird Limited Edition
                console.log(message.print());
                console.log('5');
            }

            // Grupe of Items
            if (nftTypeOf == kanBack) {
                // print backpack 
                console.log(message.print());
                console.log('6');
            }
            if (nftTypeOf == kanBg) {
                // print background
                console.log(message.print());
                console.log('7');
            }
            if (nftTypeOf == kanFrnt) {
                // print foreground
                console.log(message.print());
            }
            if (nftTypeOf == kanHead) {
                // print headwear
                console.log(message.print());
            }
            if (nftTypeOf == kanHand) {
                // print handheld
                console.log(message.print());
            }
            if (nftTypeOf == kanChest) {
                // print necklace
                console.log(message.print());
            }
            if (freeString == remarkNft) {
                // La stringa confronta con tutta la perte dell'url inerente nel campo libero
                console.log(message.print());
                console.log('8');
            }
            if (freeString == linkCatalogoComp) {
                // La stringa confronta tutto l'url
                console.log(message.print());
                console.log('9');
            }
            if (freeString == addressSell) {
                // La stringa confronta se un address ha listato qualche cosa
                console.log(message.print());
                console.log('10');
            }

        } // end Price
    } // end List
    //return del messaggio 
}