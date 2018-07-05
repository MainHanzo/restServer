var express = require('express'),
    app = express(),

    port = process.env.PORT || 8868;
var models = require('./api/models/Model');
var listTrunks = models.MakeTrunks(24000);              //create a list of trunks with random size and every trunk has a corresponding BF
var listBloomFilter = models.CreateListBloomFilter(24000);            //create a list of bloom filters and the number of bloom filter is the argument

app.listen(port);

var fs=require('fs');
for(var i = 0;i<1;i++){
    var file="./addr/addresses"+i+".json";
    result = [];
    console.log("dd"+result.length);//
    var result = result.concat(JSON.parse(fs.readFileSync(file)));
}




console.log("ddd"+result.length);//

var i = 0;
var j = 0;
result.forEach(function (obj) {
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

result.forEach(function (obj) {
    models.VerifyBloomFilters(obj);
})


console.timeEnd("Hi Sam");




