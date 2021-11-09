let dumpKANCHEST = require('../dumpbuild/CollectionsDump/KANCHEST.json');
let dumpKANBACK = require('../dumpbuild/CollectionsDump/KANBACK.json');
let dumpKANBG = require('../dumpbuild/CollectionsDump/KANBG.json');
let dumpKANHAND = require('../dumpbuild/CollectionsDump/KANHAND.json');
let dumpKANHEAD = require('../dumpbuild/CollectionsDump/KANHEAD.json');
let dumpEVNTS = require('../dumpbuild/CollectionsDump/EVNTS.json');
let dumpKANFRNT = require ('../dumpbuild/CollectionsDump/KANFRNT.json');

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
    let Filter = {
        "allList": 0,
        "allBird": 0,
        "SuperFunder": 0,
        "Funder": 0,
        "Rare": 0,
        "Limited" : 0,
        "BackPack" : 0,
        "Background" : 0,
        "ForeGround" : 0,
        "Headwear" : 0,
        "Handheld" :0,
        "Necklace" : 0,
        "isBird" : 0,
        "price": 0
    }
    // toDo: add price
    // toDo: add switch per cercare info slot in EVNTS

    if(remark.includes(kanbirdSuperFounder))Filter.SuperFunder = 1
    if(remark.includes(kanbirdFounder))Filter.Funder = 1
    if(remark.includes(kanbirdRare))Filter.Rare = 1
    if(remark.includes(kanbirdLimited))Filter.Limited =1
    if(remark.includes(kanBack))Filter.BackPack = 1
    if(remark.includes(kanBg))Filter.Background = 1
    if(remark.includes(kanFrnt))Filter.ForeGround = 1
    if(remark.includes(kanHead))Filter.Headwear = 1
    if(remark.includes(kanHand))Filter.Handheld = 1
    if(remark.includes(kanChest))Filter.Necklace = 1
    if(remark.includes(kanbird)) Filter.isBird = 1

    if (remark.includes(Evnts)){
        var eventItems = dumpEVNTS[`${remarkNft}`].slot;
        eventItems.split('.');
        eventItems[eventItems.length - 1];

        switch (eventItems) {
            case backpack:
                Filter.BackPack = 1
            break;
            case background:
                Filter.Background = 1
                break;
            case foreground:
                Filter.ForeGround = 1
                break;
             case headwear:
                Filter.Headwear = 1
                break;
             case objectleft:
                Filter.Handheld = 1
                break;
             case necklace:
                Filter.Necklace = 1
                break;
             default:
                Filter.allList = 0         
        }
    }
    var remarkSplit = remark.split('::');
    let price = remarkSplit[4] / 950000000000;
    Filter.price = price
    let stringFilter= ''
    for(key in Filter)stringFilter += (Filter[key]);
    return Filter
}
//ordine bit lato db
//allList,allBird,SuperFunder,Funder,Rare,Limited,BackPack,Background,Foreground,Headwear,Handheld,Necklace
exports.checkFilterMessage_User = function checkFilterMessage_User(filterMessage, filterUser, priceLimit) {
        let stringFilterMessage
        for(key in filterMessage)stringFilterMessage += (filterMessage[key]);
        if(priceLimit != 0){
            if(filterMessage.price > priceLimit)return false
        }
        if(filterUser[0])return true // all 
        if(filterUser[1] && filterMessage.isBird) return true // only Kanaria Bird

        if(filterMessage.Funder)
        //tipi di oggetti
        for(var i = 2; i < filterUser.lenght;i++){
            if(filterUser[i]){
                if(!stringFilterMessage[i])return false
            }
        }
        // if(filterUser[6] )
        console.log(filterMessage)
        console.log(filterUser)
        return true
        
}