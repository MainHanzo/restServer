const bloom = require("bloom-filter");

var listBloomFilter = [];
var listTrunks  = [];


const  CreateListBloomFilter = function(number) {

    for (var i = 0; i < number; i++) {
        var bloomfilter = bloom.create(
            listTrunks[i].length, // nb of elements.
            0.05       // false positive rate

        );
        listBloomFilter.push(bloomfilter);

    }
    console.log("bloom added " + listBloomFilter.length);
    return listBloomFilter;
}

const VerifyBloomFilters = function(addr){
    for (let bloomFilterIndex in listBloomFilter) {
        let bloomFilter = listBloomFilter[bloomFilterIndex];
        if(!bloomFilter.contains(addr))
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
        // console.log("trunk "+ i +"has length: " + trunk.length);
        listTrunks.push(trunk);
    }
    console.log("trunks done!");
    return listTrunks;

}

const LoadTrunks = function(i,j,addr){
     console.log(i+" "+j+" "+addr);
    listTrunks[i][j] = addr;
    listBloomFilter[i].insert(addr);
}

module.exports.CreateListBloomFilter = CreateListBloomFilter;
module.exports.VerifyBloomFilters = VerifyBloomFilters;
module.exports.MakeTrunks = MakeTrunks;
module.exports.LoadTrunks = LoadTrunks;