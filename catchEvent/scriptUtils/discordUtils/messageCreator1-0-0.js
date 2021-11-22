/***************************
 * FILTER UTILITY
 ***************************/
 const {MessageEmbed} = require('discord.js')
 const linkCatalogo = "https://singular.rmrk.app/collectibles/";
 const linkIpfs = "https://rmrk.mypinata.cloud/ipfs/";
 
 exports.buildMessage = function buildMessage(remark) {
     var remarkSplit = remark.split('::'); // rmrk::LIST::1.0.0::5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001::1000000000000
     var remarkNft = remarkSplit[3]; // 5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001
     var nftType = remarkNft.split('-');
 
     var nftName = nftType[3] + ' (n° ' + nftType[4] + ')'; // POTION_HEAL (n° 0000000000000001)
     var collection = nftType[2] + ' (' + nftType[1] + ')'; // VALHELLO (0aff6865bed3a66b)
     var remarkPrice = (remarkSplit[4] / 1000000000000) / 0.98
     remarkPrice = Number(remarkPrice)
     remarkPrice = remarkPrice.toFixed(2)
     remarkPrice = Number(remarkPrice)
     var linkCatalogoComp = linkCatalogo + remarkNft; // link to the page 
 
     var imgDump = linkIpfs + remarkNft + '.jpg'; // Check
     var thumb = imgDump.split('/'); // Check
     thumb = thumb[thumb.length - 2] + "/" + thumb[thumb.length - 1]; // Check
  
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
 
 
     var message = 'OH!\n NFT has been '+remrkEventMessage+' on Singular \n' + nftName + ' \n\
Collection: ' + collection + ' \n\
\n Price: ' + remarkPrice + ' \n\
\n Take a look ->' + linkCatalogoComp;
 
     const embed = new MessageEmbed()
         .setColor('#0099ff')
         .setTitle('SINGULAR RMRK 1.0.0')
         .setURL(`${imgDump}`)
         .setAuthor('watchingSingularBot')
         .setDescription(`${message}`)
         .setThumbnail(`${imgDump}`)
         .setImage(`${imgDump}`)
         .setTimestamp()
         .setFooter('Charging of photo can take some time');
     return embed
 }
