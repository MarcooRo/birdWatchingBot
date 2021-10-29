
let dump = require('./DUMP2.json');
const collect = ["KANBACK","KANBG","KANFRNT", "KANHEAD", "KANHAND","KANCHEST"]
const fs = require('fs');
const fine = `"fine":{}}`

function writeFile(name, obj){
    fs.appendFileSync(`./CollectionsDump/${name}.json`, obj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
}

function checkKey(key) {
    for(let i = 0; i < collect.length; i++){
        if(key.includes(collect[i]))return true
    }
    return false
}

var value = ""
var collection = ""
let obj = {}
//devo aprire graffa in tutti i file
collect.forEach(element => {
    writeFile(element, "{")
});
for (var key in dump.nfts){
    if(!checkKey(key))continue
    value = dump.nfts[key];
    collection = value.collection.split('-')[1]
    //creazione del'oggetto
    if(value.resources[0].src == undefined) console.log(key)
    let text = ` "${key}" : {` +
    ` "src": "${value.resources[0].src}" ,
       "slot": "${value.resources[0].slot}",` +
    `  "collection": "${collection}", 
       "metadata": "${value.metadata}"},`;

    switch(collection){
        case 'KANBACK':
            writeFile("KANBACK", text)
        case 'KANBG':
            writeFile("KANBG", text)
        case 'KANFRNT':
            writeFile("KANFRNT", text)
        case 'KANHEAD':
            writeFile("KANHEAD", text)
        case 'KANHAND':
            writeFile("KANHAND", text)
        case 'KANCHEST':
            writeFile("KANCHEST", text)
    }
}
//devo scrivere json di fine su tutti i file
collect.forEach(element => {
    writeFile(element, fine)
});


// let test = require('./CollectionsDump/KANCHEST.json');
// console.log(test['8788586-e0b9bdcc456a36497a-KANCHEST-1f194_necklace-00000001'])
