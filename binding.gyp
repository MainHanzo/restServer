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

    'conditions': [
            [ 'OS=="mac"', {

                             'xcode_settings': {
                               'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++','-mavx2'],
                               'OTHER_LDFLAGS': ['-stdlib=libc++','-mavx2'],
                               },

                           }],

            [ 'OS=="linux"', {


               'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++','-mavx2'],
               'OTHER_LDFLAGS': ['-stdlib=libc++','-mavx2'],


                                       }],


  }]
  ]}
