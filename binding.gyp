{
  "targets": [{
    "target_name": "SimdBlockFilter",

    "sources": [
      "addon.cpp",
      "SimdBlockFilter.h",
      "SimdBlockWrap.cpp",
      "SimdBlockWrap.h",
      "hashutil.cc",
      "hashutil.h",
      "farmhash-master/src/farmhash.h",
      "farmhash-master/src/farmhash.cc"
    ],
    'cflags': ['-fexceptions'],
    'cflags_cc': ['-fexceptions'],
    "include_dirs": [
        ".",
     ],


    'conditions': [
            [ 'OS=="mac"', {

                             'xcode_settings': {
                               'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++','-mavx2'],
                               'OTHER_LDFLAGS': ['-stdlib=libc++','-mavx2'],
                               },

                           }],
            [ 'OS=="linux"', {

                            'target_defaults': {
                            'cflags': ['-fexceptions'],
                            'cflags_cc': ['-fexceptions','-mavx2','-mavx'],



                            }
                        }],
          ],
    "xcode_settings": {
      "OTHER_CFLAGS": ["-mavx2"],
      "OTHER_CPLUSPLUSFLAGS" : ["-std=c++11","-stdlib=libc++", "-v"],
      "MACOSX_DEPLOYMENT_TARGET": "10.9",
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "cflags": ["-mavx2"],
      "ldflags": ["-mavx2"],
    },
    "msvs_settings": {
      "VCCLCompilerTool": {
      "AdditionalOptions": ["/arch:AVX2"]
       }
    }
  }]
}