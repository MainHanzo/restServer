//
//  simd-block-wrap.cpp
//  
//
//  Created by Yang Hua on 23/7/2561 BE.
//




#include "SimdBlockWrap.h"
#include "uint256.h"
#include <stdlib.h>

namespace SimdBlockWrap{

    using namespace v8;


Persistent<Function> SimdBlockWrap::constructor;

SimdBlockWrap::SimdBlockWrap(const int log_heap_space)
: SimdBlockFilter(log_heap_space){

}

SimdBlockWrap::~SimdBlockWrap(){
}

void SimdBlockWrap::Init(Local<Object> exports) {
    Isolate* isolate = exports->GetIsolate();
    
    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, "SimdBlockFilter"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    
    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "add", SimdBlockWrap::Add);
    NODE_SET_PROTOTYPE_METHOD(tpl, "find", SimdBlockWrap::Find);

    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, "SimdBlockFilter"),
                 tpl->GetFunction());
}



void SimdBlockWrap::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new SimdBlockWrap(...)`
    unsigned int key = args[0]->IsUndefined() ? 0 : args[0]->Uint32Value();
    SimdBlockWrap* obj = new SimdBlockWrap(key);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());


  }else {
       // Invoked as plain function `BloomFilter(...)`, turn into construct call.
       const int argc = 1;
       Local<Value> argv[argc] = { args[0] };
       Local<Context> context = isolate->GetCurrentContext();
       Local<Function> cons = Local<Function>::New(isolate, constructor);
       Local<Object> result =
           cons->NewInstance(context, argc, argv).ToLocalChecked();
       args.GetReturnValue().Set(result);
     }
}

void SimdBlockWrap::Add(const FunctionCallbackInfo<Value>& args){

    Isolate* isolate = args.GetIsolate();
    String::Utf8Value str(isolate, args[0]->ToString());
    const char * buffer = *str;

    SimdBlockWrap* obj = ObjectWrap::Unwrap<SimdBlockWrap>(args.Holder());
    obj->add(buffer,100);
    
}

void SimdBlockWrap::Find(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    String::Utf8Value str(isolate, args[0]->ToString());
    const char * buffer = *str;

    SimdBlockWrap* obj = ObjectWrap::Unwrap<SimdBlockWrap>(args.Holder());
    bool exists = obj->find(buffer,100);
    args.GetReturnValue().Set(Boolean::New(isolate, exists));
    
}

}
