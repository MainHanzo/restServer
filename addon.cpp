//
//  addon.cpp
//  
//
//  Created by Yang Hua on 24/7/2561 BE.
//
#include <node.h>
#include "SimdBlockWrap.h"


namespace SimdBlockWrap {
    
    using v8::Local;
    using v8::Object;
    
    void InitAll(Local<Object> exports) {
        SimdBlockWrap::Init(exports);
    }
    
    NODE_MODULE(addon, InitAll)
    
}
