//
//  simd-block-wrap.cpp
//  
//
//  Created by Yang Hua on 23/7/2561 BE.
//




#include "SimdBlockWrap.h"
#include <stdlib.h>

namespace SimdBlockWrap{

    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::FunctionTemplate;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::Persistent;
    using v8::String;
    using v8::Boolean;
    using v8::Value;


Persistent<Function> SimdBlockWrap::constructor;

SimdBlockWrap::SimdBlockWrap(const int log_heap_space)
: SimdBlockFilter(log_heap_space){

}

void SimdBlockWrap::Init(Local<Object> exports) {
    Isolate* isolate = exports->GetIsolate();
    
    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, "simd_block_wrap"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    
    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "add", SimdBlockWrap::Add);
    NODE_SET_PROTOTYPE_METHOD(tpl, "exists", SimdBlockWrap::Find);
    
    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, "simd_block_wrap"),
                 tpl->GetFunction());
}

SimdBlockWrap::~SimdBlockWrap(){
    
}

void SimdBlockWrap::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new SimdBlockWrap(...)`
    String::Utf8Value str(isolate, args[0]->ToString());
    const char * buffer = *str;

    SimdBlockWrap* obj = new SimdBlockWrap(atoi(buffer));
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `SimdBlockWrap(...)`, turn into construct call.
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
    String::Utf8Value str(isolate,args[0]->ToString());
    const char * temp = *str;
    int buffer = atoi(temp);
    SimdBlockWrap* obj = ObjectWrap::Unwrap<SimdBlockWrap>(args.Holder());
    obj->add(buffer);
    
}

void SimdBlockWrap::Find(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
    String::Utf8Value str(isolate,args[0]->ToString());
    const char * temp = *str;
    int buffer = atoi(temp);
    
    SimdBlockWrap* obj = ObjectWrap::Unwrap<SimdBlockWrap>(args.Holder());
    bool exists = obj->find(buffer);
    
    args.GetReturnValue().Set(Boolean::New(isolate, exists));
    
}

}
