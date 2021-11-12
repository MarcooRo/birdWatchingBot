let dumpKANCHEST = require('../dumpbuild/CollectionsDump/KANCHEST.json');
let dumpKANBACK = require('../dumpbuild/CollectionsDump/KANBACK.json');
let dumpKANBG = require('../dumpbuild/CollectionsDump/KANBG.json');
let dumpKANHAND = require('../dumpbuild/CollectionsDump/KANHAND.json');
let dumpKANHEAD = require('../dumpbuild/CollectionsDump/KANHEAD.json');
let dumpEVNTS = require('../dumpbuild/CollectionsDump/EVNTS.json');
let dumpKANFRNT = require('../dumpbuild/CollectionsDump/KANFRNT.json');

// toDo: replace string variables with value slot in dump
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
var freePrice = 0;

exports.prepareFilterMesage = function prepareFilterMesage(remark) {
        var remarkSplit = remark.split('::');
        let Filter = {
                "allList": 0,
                "allBird": 0,
                "SuperFunder": 0,
                "Funder": 0,
                "Rare": 0,
                "Limited": 0,
                "BackPack": 0,
                "Background": 0,
                "ForeGround": 0,
                "Headwear": 0,
                "Handheld": 0,
                "Necklace": 0,
                "isBird": 0,
                "price": 0
            }
            // toDo: add price
            // toDo: add switch per cercare info slot in EVNTS

        if (remark.includes(kanbirdSuperFounder)) Filter.SuperFunder = 1
        if (remark.includes(kanbirdFounder)) Filter.Funder = 1
        if (remark.includes(kanbirdRare)) Filter.Rare = 1
        if (remark.includes(kanbirdLimited)) Filter.Limited = 1
        if (remark.includes(kanBack)) Filter.BackPack = 1
        if (remark.includes(kanBg)) Filter.Background = 1
        if (remark.includes(kanFrnt)) Filter.ForeGround = 1
        if (remark.includes(kanHead)) Filter.Headwear = 1
        if (remark.includes(kanHand)) Filter.Handheld = 1
        if (remark.includes(kanChest)) Filter.Necklace = 1
        if (remark.includes(kanbird)) Filter.isBird = 1

        if (remark.includes(Evnts)){
            var eventItems = dumpEVNTS[`${remarkSplit[3]}`].slot;
            eventItems = eventItems.split('.');
            let event = eventItems[eventItems.length-1];

            switch (event) {
                case "backpack":
                    Filter.BackPack = 1
                    break;
                case "background":
                    Filter.Background = 1
                    break;
                case "foreground":
                    Filter.ForeGround = 1
                    break;
                 case "headwear":
                    Filter.Headwear = 1
                    break;
                 case "objectleft":
                    Filter.Handheld = 1
                    break;
                 case "necklace":
                    Filter.Necklace = 1
                    break;
                 default:
                    console.log('unknown')         
            }
        }
        
        ///10^12/(100-5%)/100
        let price = (remarkSplit[4] / 100000000000) / 0.95
        console.log(price)
        Filter.price = price
        let stringFilter = ''
        for (key in Filter) stringFilter += (Filter[key]);
        return Filter
    }
    //allList,allBird,SuperFunder,Funder,Rare,Limited,BackPack,Background,Foreground,Headwear,Handheld,Necklace
exports.checkFilterMessage_User = function checkFilterMessage_User(filterMessage, filterUser, priceLimit) {
    let stringFilterMessage = ""
        console.log("filter del messaggio")
        console.log(filterMessage)
        console.log("filter Utente"+filterUser)
    for (key in filterMessage) {
        stringFilterMessage += (filterMessage[key]);
    }
    if (priceLimit != 0) {
        if (filterMessage.price > priceLimit) return false
    }
    if (filterUser[0] == 1) {
        return true // all 
    }
    if (filterUser[1] == 1) {
        return  (filterMessage.isBird == 1)
    } // only Kanaria Bird

    //tipi di oggetti
    for (var i = 1; i < filterUser.length; i++) {
        if (filterUser[i] == 1) {
            if (stringFilterMessage[i] == 0) return false
        }
    }
    return true

}