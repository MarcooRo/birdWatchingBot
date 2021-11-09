const axios = require('axios')
const  XMLHttpRequest = require ('xhr2');

function getRequest(img){
    axios.get(`${img}`)
    axios.get(`${img}`)
    var waitTill = new Date(new Date().getTime() + 10 * 1000);
    while(waitTill > new Date()){}
}


exports.prepareImg = function prepareImg(message){
    remarkId = message.reamrkId
    var xhr = new XMLHttpRequest();
    let url = `https://kanaria.rmrk.app/api/rmrk2/nft/${remarkId}`
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
        let imgUrl = JSON.parse(xhr.responseText).image
        //console.log(imgUrl)
        getRequest(imgUrl)
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}


