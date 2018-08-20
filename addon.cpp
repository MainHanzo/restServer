//
//  addon.cpp
//  
//
//  Created by Yang Hua on 24/7/2561 BE.
//
#include <node.h>

#include "SimdBlockWrap.h"


namespace SimdBlockWrap {
    
    using namespace v8;


    void InitAll(Local<Object> exports) {
        SimdBlockWrap::Init(exports);


    }
    
    NODE_MODULE(simdBlock, InitAll)

    
}
