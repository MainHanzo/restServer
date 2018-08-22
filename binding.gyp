{
  "targets": [{
    "target_name": "simdBlock",

    "sources": [
      "addon.cpp",
      "SimdBlockFilter.h",
      "SimdBlockWrap.cpp",
      "SimdBlockWrap.h",
      "hashutil.cc",
      "hashutil.h",
    ],
      'cflags': ['-fexceptions'],
      'cflags_cc': ['-fexceptions'],

                                  }
    'conditions': [
            [ 'OS=="mac"', {

                             'xcode_settings': {
                               'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++','-mavx2'],
                               'OTHER_LDFLAGS': ['-stdlib=libc++','-mavx2'],
                               },

                           }],
            [ 'OS=="linux"', {

                            'target_defaults': {
                            'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++','-mavx2','-msse4.1'],
                            'OTHER_LDFLAGS': ['-stdlib=libc++','-mavx2','-msse4.1'],

                            'cflags': ['-fexceptions'],
                            'cflags_cc': ['-fexceptions'],

                            }
                        }],
          ],
    "xcode_settings": {
      "OTHER_CFLAGS": ["-mavx2"],
      "OTHER_CPLUSPLUSFLAGS" : ["-std=c++11","-stdlib=libc++", "-v"],
      "MACOSX_DEPLOYMENT_TARGET": "10.9",

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