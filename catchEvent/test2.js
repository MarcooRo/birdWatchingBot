if (nftTypJson.typeNFT == kanBack || nftTypJson.typeNFT == kanBg || nftTypJson.typeNFT == kanFrnt || nftTypJson.typeNFT == kanHead || nftTypJson.typeNFT == kanHand || nftTypJson.typeNFT == kanChest || nftTypJson.typeNFT == Evnts) {
    var xhr = new XMLHttpRequest();
    let url = `https://kanaria.rmrk.app/api/rmrk2/nft/${remarkNft}` // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let nameMeta = JSON.parse(xhr.responseText).name // I'm not sure what mean
                let properties = JSON.parse(xhr.responseText).properties.rarity.value // rare, epic, commun, ecc..
                let total_count = JSON.parse(xhr.responseText).total_count.value // how many same items there are
                let contextMeta = JSON.parse(xhr.responseText).context.value // I'm not sure what mean
            }
        }
    }
}
var htmlToAddItems = 'Rarity: ' + properties + '<br>Numero copie: ' + total_count;


if (nftTypJson.typeNFT == kanbirdSuperFounder || nftTypJson.typeNFT == kanbirdFounder || nftTypJson.typeNFT == kanbirdRare || nftTypJson.typeNFT == kanbirdLimited) {
    var xhr = new XMLHttpRequest();
    let url = `https://kanaria.rmrk.app/api/rmrk2/nft/${remarkNft}` // 8949167-e0b9bdcc456a36497a-KANBIRD-KANL-00006649
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let theme = JSON.parse(xhr.responseText).theme.value // Theme style
            }
        }
    }
}
var htmlToAddBirds = 'Theme: ' + theme;