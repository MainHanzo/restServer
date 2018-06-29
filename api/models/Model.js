const bloom = require("bloomfilter");

var listBloomFilter = [];
var listTrunks  = [];


const  CreateListBloomFilter = function(number) {

    for (var i = 0; i < number; i++) {
        var bloomfilter = new bloom.BloomFilter(
            Math.floor(-Math.log(0.05)*listTrunks[i].length/Math.log(2)/Math.log(2)), // number of bits to allocate is a function who depends on the false rate.
            2        // number of hash functions.s
        );

        listBloomFilter.push(bloomfilter);
        console.log("bloom added" + i +" "+Math.floor(-Math.log(0.05)*listTrunks[i].length/Math.log(2)/Math.log(2)));

    }
}

const VerifyBloomFilters = function(addr){
    for (let bloomFilterIndex in listBloomFilter) {
        let bloomFilter = listBloomFilter[bloomFilterIndex];
    if(!bloomFilter.test(addr))
        {
            //console.log("No." + bloomFilterIndex +" doesn't have the address: " + addr);
        }else{
            //console.log("No." + bloomFilterIndex +" has the address: " + addr);
        }
    }
}

const MakeTrunks = function(num){

    for(let i=0;i<num;i++){
        var trunk = [];
        trunk.length = Math.floor(Math.random()*400) + 100;
        console.log("trunk "+ i +"has length: " + trunk.length);
        listTrunks.push(trunk);
    }
    console.log("trunks done!");
    return listTrunks;

}

const LoadTrunks = function(i,j,addr){

    listTrunks[i][j] = addr;
    listBloomFilter[i].add(addr);
}

module.exports.CreateListBloomFilter = CreateListBloomFilter;
module.exports.VerifyBloomFilters = VerifyBloomFilters;
module.exports.MakeTrunks = MakeTrunks;
module.exports.LoadTrunks = LoadTrunks;