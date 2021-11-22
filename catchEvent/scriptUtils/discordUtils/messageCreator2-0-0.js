const { MessageEmbed } = require('discord.js')

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
    var remarkPrice = (remarkSplit[4] / 1000000000000) / 0.95
    var imgDump = 'https://kanaria-img.rmrk.link/1635945800349/jpeg/' + rmrkJson.nft + '.jpg';

    var remrkEvent = remarkSplit[1]; // LIST or BUY
    switch (remrkEvent) {
        case 'LIST':
            var remrkEventMessage = "listed";
            break;
        case 'BUY':
            var remrkEventMessage = "bought";
            break;
        default:
            var remrkEventMessage = "seen";
    }

    var thumb = imgDump.split('/');
    thumb = thumb[thumb.length - 2] + "/" + thumb[thumb.length - 1];
    let nftRarytext = ""
    switch (nftTypJson.typeRarity) {
        case kanbirdSuperFounder:
            nftRarytext = "Super Founder";
            break;
        case kanbirdFounder:
            nftRarytext = "Founder";
            break;
        case kanbirdRare:
            nftRarytext = "Rare";
            break;
        case kanbirdLimited:
            nftRarytext = "Limited edition";
        default:
            nftRarytext = "Limited edition";
    }
    let nome = ""
    let text = ""
    let id = nftType[4]
    switch (nftType[2]) {
        case kanbird:
            nome = "Kanaria Bird";
            text = "Rarity: " + nftRarytext + "\nN°" + id;
            break;
        case kanBack:
            nome = "Backpack";
            text = "N°" + id;
            break;
        case kanBg:
            nome = "Backgournd";
            text = "N°" + id;
            break;
        case kanFrnt:
            nome = "Foreground";
            text = "N°" + id;
            break;
        case kanHead:
            nome = "Headwear";
            text = "N°" + id;
            break;
        case kanHand:
            nome = "Handheld";
            text = "N°" + id;
            break;
        case kanChest:
            nome = "Necklace";
            text = "N°" + id;
            break;
        case Evnts:
            nome = "Events Items";
            text = "N°" + id;
            break;
    }

    var message = `OMG  \n\A ` + nome + " has been " + remrkEventMessage + "\n\
\n" + text + "\n\
\nPrice: " + remarkPrice + " KSM\n" +
        `\nLink del catalogo ->${linkCatalogoComp}
\n Link immagine ->${imgDump}`;

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('KANARIA RMRK 2.0.0')
        .setURL(`${imgDump}`)
        .setAuthor('BirdWatchingBot')
        .setDescription(`${message}`)
        .setThumbnail(`${imgDump}`)
        .setImage(`${imgDump}`)
        .setTimestamp()
        .setFooter('Charging of photo can take some time because the photo may cannot exhist at the moment of event');
    return embed
}