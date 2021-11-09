/***************************
 * FILTER UTILITY
 ***************************/
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
var freePrice = 0;
//ES di remerk --> "RMRK::LIST::2.0.0::8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649::20000000000";
	



exports.buildMessage = function buildMessage(remark) {
    var remarkSplit = remark.split('::');
    var remarkObj = new Map([
        ["interaction", remarkSplit[1]], // LIST - BUY
        ["nft", remarkSplit[3]], // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
        ["price", remarkSplit[4]] // 20000000000
    ]);
    var rmrkJson = Object.fromEntries(remarkObj);
    var remarkNft = rmrkJson.nft; // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
    let linkCatalogoComp = linkCatalogo + rmrkJson.nft; // link to the page 

    var nftType = remarkNft.split('-');
    var nftTypeObj = new Map([
        ["typeNFT", nftType[2]], // KANBIRD, KANBG, EVNTS
        ["typeRarity", nftType[3]], // KANL, KANS, var1_background, 1fa93_objectleft, BNCHST
        ["numberId", nftType[4]] // 00004594, 00000066, 00000017
    ]);
    var nftTypJson = Object.fromEntries(nftTypeObj);
    console.log(rmrkJson.price)
    var remarkPrice = ((remarkSplit[4]/1000000000000)/0.95)
    console.log(remarkPrice)
    var imgDump = 'https://kanaria-img.rmrk.link/1635945800349/jpeg/'+rmrkJson.nft+'.jpg';


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
        imgSRC: imgDump,
        reamrkId: rmrkJson.nft,
        nftType: nftTypJson.typeNFT,
        nftGrade: nftRarytext,
        id: nftTypJson.numberId,
        price: remarkPrice,
        link: linkCatalogoComp,
        print: function() {
            switch (this.nftType) {
                case kanbird:
                    var nome = "Kanaria Bird";
                    var text = "Rarity: " + this.nftGrade + "\nN°" + this.id;
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
            var toPrint = `<b>OMG</b><a href="${this.imgSRC}">!</a> \n\An <b>` + nome + "</b> has been listed\n\
\n<b>" + text + "</b>\n\
\n<b>Price: " + this.price + " KSM</b>\n"
+ `\n<a href="${this.link}">Take a look -></a>\n`;

            return toPrint;
        }
    };
    return message
}