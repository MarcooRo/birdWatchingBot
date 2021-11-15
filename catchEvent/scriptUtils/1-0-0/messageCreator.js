/***************************
 * FILTER UTILITY
 ***************************/

const linkCatalogo = "https://singular.rmrk.app/collectibles/";
const linkIpfs = "https://rmrk.mypinata.cloud/ipfs/";

exports.buildMessage = function buildMessage(remark) {
    var remarkSplit = remark.split('::'); // rmrk::LIST::1.0.0::5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001::10000000000
    var remarkNft = remarkSplit[3]; // 5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001
    var nftType = remarkNft.split('-');
    
    var nftName =  nftType[3] + ' (n° '+ nftType[4] +')'; // POTION_HEAL (n° 0000000000000001)
    var collection = nftType[2] + ' ('+ nftType[1] +')'; // VALHELLO (0aff6865bed3a66b)
    var remarkPrice = (remarkSplit[4] / 100000000000) / 0.95
    var linkCatalogoComp = linkCatalogo + remarkNft; // link to the page 

    var imgDump = linkIpfs + remarkNft + '.jpg'; // TODO!!!!!!
    var thumb = imgDump.split('/'); // TODO!!!!!!
    thumb = thumb[thumb.length - 2] + "/" + thumb[thumb.length - 1]; // TODO!!!!!!

    const message = {
        imgSRC: imgDump,
        reamrkId: remarkNft,
        nftName: nftName,
        collection: collection,
        price: remarkPrice,
        link: linkCatalogoComp,
        print: function() {
            var toPrint = `<b>YES</b> \n\A <b>` + this.nftName + "</b> has been listed\n\
\n<b>Collection: " + this.collection + "</b>\n\
\n<b>Price: " + this.price + " KSM</b>\n" +
                `\n<a href="${this.link}">Take a look -></a>\n`;

            return toPrint;
        }
    };
    return message
}
