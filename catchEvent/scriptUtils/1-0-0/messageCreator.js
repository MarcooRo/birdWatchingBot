/***************************
 * FILTER UTILITY
 ***************************/

const linkCatalogo = "https://singular.rmrk.app/collectibles/";
const linkIpfs = "https://rmrk.mypinata.cloud/ipfs/";
// rmrk::LIST::1.0.0::5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001::10000000000

exports.buildMessage = function buildMessage(remark) {
    var remarkSplit = remark.split('::');
    var remarkObj = new Map([
        ["nft", remarkSplit[3]], // 5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001
        ["price", remarkSplit[4]] // 10000000000
    ]);
    console.log(remarkObj)
    
    var nftType = remarkNft.split('-');
    
    var rmrkJson = Object.fromEntries(remarkObj);
    var remarkNft =  nftType[3] + ' (n° '+ nftType[4] +')'; // POTION_HEAL (n° 0000000000000001)
    let linkCatalogoComp = linkCatalogo + remarkNft; // link to the page 

    var collection = nftType[2] + ' ('+ nftType[1] +')'; // VALHELLO (0aff6865bed3a66b)
    var remarkPrice = (remarkSplit[4] / 100000000000) / 0.95

    var imgDump = linkIpfs + remarkNft + '.jpg'; // TODO!!!!!!
    var thumb = imgDump.split('/'); // TODO!!!!!!
    thumb = thumb[thumb.length - 2] + "/" + thumb[thumb.length - 1]; // TODO!!!!!!
    console.log(imgDump)

    const message = {
        imgSRC: imgDump,
        reamrkId: remarkNft,
        collection: collection,
        price: remarkPrice,
        link: linkCatalogoComp,
        print: function() {
            var toPrint = `<b>YES</b> <a href="${this.imgSRC}">!</a>   \n\A <b>` + this.reamrkId + "</b> has been listed\n\
\n<b>Collection: " + this.collection + "</b>\n\
\n<b>Price: " + this.price + " KSM</b>\n" +
                `\n<a href="${this.link}">Take a look -></a>\n`;

            return toPrint;
        }
    };
    return message
}
