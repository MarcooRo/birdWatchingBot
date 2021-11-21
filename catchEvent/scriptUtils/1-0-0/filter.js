exports.prepareFilterMesage = function prepareFilterMesage(remark) {
    let Filter = {
        "collection": 0, // Filter.collection
        "nft": 0, // Filter.id
        "price": 0 // Filter.price
    }

    var remarkSplit = remark.split('::');
    let id = remarkSplit[3]
    console.log(id)
    Filter.id = id // singol NFT - 5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001

    var idSplit = id.split('-')
    let collection = idSplit[1] + "-" + idSplit[2]
    console.log(collection)
    Filter.collection = collection // 0aff6865bed3a66b-VALHELLO

    let price = (remarkSplit[4] / 100000000000) / 0.95
    console.log(price)
    Filter.price = price

    let stringFilter = ''
    for (key in Filter) stringFilter += (Filter[key]);
    return Filter
}

exports.checkFilterMessage_User = function checkFilterMessage_User(filterMessage, filterUser ,nft, collection, priceLimit) {

    var NFT = filterMessage.nft.toString()
    var COLLECTION = filterMessage.collection.toString()
    if (priceLimit != 0) {
        if (filterMessage.price <= priceLimit) return true
    }
    if (filterUser[0] == 1) {
        return true // all 
    }
    if(nft != 0 ){
        if(NFT.includes(nft)) return true
    }
    if(collection != 0){
        if(COLLECTION.includes(collection)) return true
    }
    return false
}
