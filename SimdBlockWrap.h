//
//  simd-block-wrap.hpp
//
//
//  Created by Yang Hua on 23/7/2561 BE.
//

#ifndef simd_block_wrap_hpp
#define simd_block_wrap_hpp


#include <node.h>
#include <node_object_wrap.h>
#include "SimdBlockFilter.h"
#include "hashutil.h"

namespace SimdBlockWrap {


    class SimdBlockWrap : public SimdBlockFilter<cuckoofilter::TwoIndependentMultiplyShift >, public node::ObjectWrap {
    public:

        static void Init(v8::Local<v8::Object> exports);

    private:
        SimdBlockWrap(const int log_heap_space);

        virtual ~SimdBlockWrap();
        static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
        static void Add(const v8::FunctionCallbackInfo<v8::Value>& args);
        static void Find(const v8::FunctionCallbackInfo<v8::Value>& args);

        static v8::Persistent<v8::Function> constructor;

    };
}
#endif
