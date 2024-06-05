import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import { getRepoName } from '@common/utils';
import SigDetail from './SigDetail';
import { useRouter } from 'next/router';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useSubjectSigPageQuery,
  SubjectSigPage,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Tag } from 'antd';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
interface TableQuery {
  label: string;
  level?: string;
  page?: number;
  per?: number;
}
const typeLit = [
  {
    URL: 'https://gitee.com/openharmony-tpc/ohos_mail',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/CommonsCompress',
    type: '数据压缩算法',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ArcProgressStackViewJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/CircleImage',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ContinuousScrollableImageJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/CurtainJs',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/Image3DJs',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ImageKnife',
    type: '图片',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/LargeImage',
    type: '图片',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/LoadingViewJs',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/LocationUtil',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/MMKV',
    type: '数据存储',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/MaterialFloatingActionButton',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/MaterialRadio',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/MaterialSlider',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/NeumorphismDesign',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/NineGridImageViewJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/OutBoundCode',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/RefreshLoadMoreComponentJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/RocketChat',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/SelectViewJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/SmartRefrigerator',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/SmartWatch4',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/SmartWatch_seven',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/StatusViewJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/UtilCode',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/VCard',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/Verbal_Expressions',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/XmlGraphicsBatik',
    type: '图片',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ai_framework_integration',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/arouter-api-onActivityResult',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_buildtools_libcpp',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_buildtools_libcppapi',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_buildtools_libunwind',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_buildtools_script',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_cef',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_chrome',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_chrome_test_canvas_bench',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_chrome_test_frame_rate',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_chrome_test_xr',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_docs_website',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ArcProgressStackViewJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_src',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_angle',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_angle_glmark2',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_angle_rapidjson',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_angle_vk_gl_cts',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_apache_portable_runtime',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_blink_webtests',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_boringssl',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_breakpad',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_cast_core',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_catapult',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ced',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_cld_3',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_colorama',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_crc32c',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_cros_system_api',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_dav1d',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_dawn',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_dawn_tint',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_depot_tools',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_devtools_frontend',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_dom_distiller_js',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_eigen3',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_emoji_segmenter',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_expat',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_farmhash',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ffmpeg',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_flac',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_flatbuffers',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_fontconfig',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_fp16',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_freetype',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_freetype_testing',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_gemmlowp',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_glfw',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_googletest',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_grpc',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_gvr_android_sdk',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_harfbuzz_ng',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_highway',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_hunspell_dictionaries',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_icu',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_javalang',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_jsoncpp',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_junit',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_leveldatabase',
    type: '数据存储',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libFuzzer',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libaddressinput',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libaom',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libavif',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libdrm',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libgav1',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libgifcodec',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libjpeg_turbo',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libjxl',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_liblouis',
    type: '字体字幕处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libphonenumber',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libprotobuf_mutator',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libsrtp',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libsync',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libunwindstack',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libvpx',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libwebm',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_libyuv',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_lss',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_minigbm',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_minizip',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_mockito',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_nasm',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_neon_2_sse',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_netty4',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_netty_tcnative',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ohos_nweb_hap',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ohos_prebuilts',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_openh264',
    type: '视频编解码',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_openscreen',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_openscreen_tinycbor',
    type: '网络协议通信',
  },

  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_pdfium',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_perfetto',
    type: '日志打印',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_pyelftools',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_pywebsocket3',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_quic_trace',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_re2',
    type: '文本解析器',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_requests',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_rust',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ruy',
    type: '深度学习',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_securemessage',
    type: '安全',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_shaderc',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_skia',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_smhasher',
    type: '数据结构存储',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_snappy',
    type: '数据压缩算法',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_sqlite',
    type: '数据存储',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_swiftshader',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_tflite',
    type: '深度学习',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ub_uiautomator',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_ukey2',
    type: '安全',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_usrsctp',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_glslang',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_spirv_cross',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_spirv_headers',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_spirv_tools',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_vulkan_headers',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_vulkan_loader',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_vulkan_tools',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_deps_vulkan_validation_layers',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_vulkan_memory_allocator',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_wayland',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_wayland_protocols_gtk',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_wayland_protocols_kde',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_wayland_protocols_src',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_webdriver',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_webgl',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_webgpu_cts',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_webrtc',
    type: '音视频',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_weston',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_wuffs',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_third_party_xdg_utils',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_tools_acid3',
    type: '工具',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/chromium_v8',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/commonmark',
    type: '文本解析器',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/commons-codec',
    type: '加解密算法',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/device_board_amlogic',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/device_soc_amlogic',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/docs',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/flexsearch-ohos',
    type: '搜索',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/httpclient',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/lottieArkTS',
    type: '动画',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/manifest',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/mixpanel-ohos',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/mnn',
    type: '深度学习',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/mp4parser',
    type: '多媒体',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ncnn',
    type: '深度学习',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/node-csv',
    type: '数据与传输',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ohos-CoverflowJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ohos_coap',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ohos_mail_base',
    type: '框架类',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/ohos_mqtt',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/okio',
    type: '数据与传输',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/opencsv',
    type: '数据与传输',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/openharmony_tpc_samples',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/paddle_lite',
    type: '深度学习',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/pdfViewer',
    type: '图像图形处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/pinyin4js',
    type: '字体字幕处理',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/protobuf',
    type: '数据结构存储',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/rebound',
    type: '动画',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/retrofit',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/search_dialogJS',
    type: 'UI',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/shineweng-datasphere',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/talkweb_edge',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/talkweb_iiot',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/talkweb_link_sdk',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/talkweb_mqtt',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/thrift',
    type: '网络协议通信',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/tpc_resource',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/vendor_amlogic',
    type: '其他',
  },
  {
    URL: 'https://gitee.com/openharmony-tpc/zxing',
    type: '图像图形处理',
  },
];
const getOhQuery = (result) => {
  let hash = window.location.hash;
  let typeName = '';
  if (hash && hash.includes('?')) {
    let parts = hash.split('?');
    let hashQuery = parts[1];
    let searchParams = new URLSearchParams(hashQuery);
    let sigName = searchParams.get('sigName');
    typeName = result.find((i) => i.ID === sigName);
  }
  return typeName;
};
const MemberTable = () => {
  let result = [];
  typeLit.forEach((item) => {
    if (result.find((z) => z.type === item.type)) {
      let type = result.find((z) => z.type === item.type);
      type.URL.push(item.URL);
    } else {
      result.push({
        type: item.type,
        URL: [item.URL],
      });
    }
  });

  result = result.map((x) => {
    return {
      key: x.type,
      ID: x.type,
      URL: x.URL,
      company: x.URL.map((y) => getRepoName(y) + '、')
        .slice(0, 3)
        .join('\n'),
      maintainer: '',
      mail: 'tpc@openharmony.com',
    };
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [sigItem, setSigItem] = useState(getOhQuery(result));
  const dataSource = result;
  const { timeStart, timeEnd } = useQueryDateRange();

  const columns = [
    {
      title: 'SIG 名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              setSigItem(record);
            }}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '仓库',
      dataIndex: 'linkSig',
      key: 'linkSig',
      render: (text) => {
        let dom = text?.repos?.map((i) => <Tag>{i}</Tag>);
        return <div className="flex flex-wrap gap-y-2">{dom}</div>;
      },
    },
    {
      title: 'Maintainer',
      dataIndex: 'maintainers',
      key: 'maintainers',
      render: (text) => {
        let dom = text?.map((i) => <Tag>{i}</Tag>);
        return <div className="flex flex-wrap gap-y-2">{dom}</div>;
      },
    },
    {
      title: '邮件',
      dataIndex: 'emails',
      key: 'emails',
    },
  ];
  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption({
    label: 'openharmony-tpc',
    level: 'community',
  });
  const myQuery = {
    page: query.page,
    per: query.per,
    label: 'openharmony-tpc',
    level: 'community',
  };
  const { isLoading, isFetching } = useSubjectSigPageQuery(client, myQuery, {
    onSuccess: (data) => {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.subjectSigPage.count as number,
        },
      });
      setData(data.subjectSigPage.items);
    },
  });
  return (
    <>
      {sigItem ? (
        <SigDetail sigInfo={sigItem} setSigName={setSigItem} />
      ) : (
        <TableCard
          className={'mb-0'}
          id={'committerStatistics'}
          title={'SIG 管理'}
        >
          <MyTable
            columns={columns}
            dataSource={tableData}
            loading={isLoading || isFetching}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            rowKey={'key'}
            scroll={{ x: 'max-content' }}
          />
          <Dialog
            open={openConfirm}
            classes={{
              paper: classnames(
                'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
                'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
              ),
            }}
            dialogTitle={
              <>
                <p className="">Committer 详情 (total：1)</p>
                <div
                  className="absolute right-6 top-4 cursor-pointer p-2"
                  onClick={() => {
                    setOpenConfirm(false);
                  }}
                >
                  <GrClose className="text-base" />
                </div>
              </>
            }
            dialogContent={<div className="w-full"></div>}
            handleClose={() => {
              setOpenConfirm(false);
            }}
          />
        </TableCard>
      )}
    </>
  );
};

export default MemberTable;
