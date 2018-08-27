// const bloom = require("bloom-filter");
var simd = require('../../build/Release/SimdBlockFilter');
var Base58 = require('base58');
var listSimd = [];
var listTrunks  = [];


const  CreateListSimd = function(number) {

    for (var i = 0; i < number; i++) {
        var simdBlock = simd.SimdBlockFilter(
            listTrunks[i].length/300, // listTrunks[i].length: nb of elements
        );
        listSimd.push(simdBlock);

    }
    console.log("bloom added " + listSimd.length);
    return listSimd;
}

const VerifySimds = function(addr){
    for (let simdBlockIndex in listSimd) {
        let simdBlock = listSimd[simdBlockIndex];
        if(!simdBlock.find(addr))
            {
                //console.log("No." + simdBlockIndex +" doesn't have the address: " + addr);
            }else{
                // console.log("No." + simdBlockIndex +" has the address: " + addr);
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

const Base58Decode = function (addr) {

    return Base58.decode(addr);
}

const LoadTrunks = function(i,j,addr){
    addr = addr.substr(1,addr.length);
    console.log(i+" "+j+" "+addr);
    listTrunks[i][j] = Base58Decode(addr);

    listSimd[i].add(Base58Decode(addr));
}

module.exports.CreateListSimd = CreateListSimd;
module.exports.VerifySimds = VerifySimds;
module.exports.MakeTrunks = MakeTrunks;
module.exports.LoadTrunks = LoadTrunks;