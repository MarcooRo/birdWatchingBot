let dump = require('./DUMP.json');
<<<<<<< HEAD
=======

>>>>>>> 355ccb2d30f91abf88c08ac066792903c8556ee9
const collect = ["KANS", "KANF", "KANR", "KANL", "KANBACK", "KANBG", "KANFRNT", "KANHEAD", "KANHAND", "KANCHEST", "EVNTS"]
const fs = require('fs');
const fine = `"fine":{}}`

function writeFile(name, obj) {
    fs.appendFileSync(`./CollectionsDump/${name}.json`, obj, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
}

function checkKey(key) {
    for (let i = 0; i < collect.length; i++) {
        if (key.includes(collect[i])) return true
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
for (var key in dump.nfts) {
    if (!checkKey(key)) continue
    value = dump.nfts[key];
    collection = value.collection.split('-')[1]
        //creazione del'oggetto
<<<<<<< HEAD
    if (value.resources[0].src == undefined) console.log(value.resources[0])
=======
    if (value.resources[0].thumb == undefined) console.log(key)
>>>>>>> 355ccb2d30f91abf88c08ac066792903c8556ee9
    let text = ` "${key}" : {` +
        ` "thumb": "${value.resources[0].thumb}" ,
       "slot": "${value.resources[0].slot}",` +
        `  "collection": "${collection}", 
       "metadata": "${value.metadata}"},`;

    switch (collection) {
        case 'KANS':
            writeFile("KANS", text)
        case 'KANF':
            writeFile("KANF", text)
        case 'KANR':
            writeFile("KANR", text)
        case 'KANL':
            writeFile("KANL", text)
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
        case 'EVNTS':
            writeFile("EVNTS", text)
    }
}
//devo scrivere json di fine su tutti i file
collect.forEach(element => {
    writeFile(element, fine)
});


// let test = require('./CollectionsDump/KANCHEST.json');
// console.log(test['8788586-e0b9bdcc456a36497a-KANCHEST-1f194_necklace-00000001'])