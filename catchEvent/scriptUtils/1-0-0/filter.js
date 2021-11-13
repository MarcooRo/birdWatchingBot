exports.prepareFilterMesage = function prepareFilterMesage(remark) {
        var remarkSplit = remark.split('::');
        // rmrk::LIST::1.0.0::5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001::10000000000

        let id = remarkSplit[3]
        console.log(id)
        Filter.id = id // singol NFT - 5105000-0aff6865bed3a66b-VALHELLO-POTION_HEAL-0000000000000001

        var idSplit = id.split('-')
        let collection = idSplit[1] + "-" + idSplit[2]
        console.log(collection)
        Filter.collection = collection // 0aff6865bed3a66b-VALHELLO

        ///10^12/(100-5%)/100
        let price = (remarkSplit[4] / 100000000000) / 0.95
        console.log(price)
        Filter.price = price

        let Filter = {
            "All": 0,
            "Specific Collection": 0, // Filter.collection
            "Specific NFT": 0, // Filter.id
            "price": 0 // Filter.price
        }

        let stringFilter = ''
        for (key in Filter) stringFilter += (Filter[key]);
        return Filter
    }
    //ordine bit lato db

exports.checkFilterMessage_User = function checkFilterMessage_User(filterMessage, filterUser, priceLimit) {
    let stringFilterMessage = ""
    console.log("filter del messaggio")
    console.log(filterMessage)
    console.log("filter Utente" + filterUser)
    
    if (priceLimit != 0) {
        if (filterMessage.price > priceLimit) return false
    }
    if (filterUser[0] == 1) {
        return true // all 
    }
    return true

}