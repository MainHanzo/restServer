var express = require('express'),
    app = express(),

    port = process.env.PORT || 8868;
var models = require('./api/models/Model');
var listTrunks = models.MakeTrunks(80);              //create a list of trunks with random size and every trunk has a corresponding BF
var listBloomFilter = models.CreateListBloomFilter(80);                    //create a list of bloom filters and the number of bloom filter is the argument

app.listen(port);

var fs=require('fs');
var file="./Addresses.json";
var result=JSON.parse(fs.readFileSync( file));

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

//console.log("yeah");

//
