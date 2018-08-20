// const bloom = require("bloom-filter");
var simd = require('../../build/Release/simdBlock');
var listSimd = [];
var listTrunks  = [];


const  CreateListSimd = function(number) {

    for (var i = 0; i < number; i++) {
        var simdBlock = simd.simdBlock(
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

const LoadTrunks = function(i,j,addr){
    console.log(i+" "+j+" "+addr);
    listTrunks[i][j] = addr;
    listSimd[i].add(require('crypto').createHash('md5').update(addr).digest());
    // listSimd[i].add(addr);
}

module.exports.CreateListSimd = CreateListSimd;
module.exports.VerifySimds = VerifySimds;
module.exports.MakeTrunks = MakeTrunks;
module.exports.LoadTrunks = LoadTrunks;