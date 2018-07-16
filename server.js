var express = require('express'),
    app = express(),

    port = process.env.PORT || 8868;
var nbFiles = 1;
var models = require('./api/models/Model');
var listTrunks = models.MakeTrunks(120*nbFiles);              //create a list of trunks with random size and every trunk has a corresponding BF
var listBloomFilter = models.CreateListBloomFilter(120*nbFiles);                    //create a list of bloom filters and the number of bloom filter is the argument

app.listen(port);
var result = [];

var fs=require('fs');
for(var i =0;i<nbFiles;i++) {
    var file = "./addr/addresses" + i + ".json";

    var result = result.concat(JSON.parse(fs.readFileSync(file)));
}
//console.time("Hi Sam");



var i = 0;
var j = 0;
result.forEach(function(obj){

    //console.log(i+" "+j+ " "+ obj);
    models.LoadTrunks(i,j,obj);
    j++;
    if(j == listTrunks[i].length){
        j=0;
        i++;
    }
    if(i==listTrunks.length){
        return 111;
    }


})

//listBloomFilter.forEach(function(obj){
//    console.log(obj.inspect());
//})

console.time("Hi Sam");

result.forEach(function(obj) {
    models.VerifyBloomFilters(obj);
})
console.timeEnd("Hi Sam");
const addon = require('./build/Release/addon');
console.log(addon.hello());



