import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import style from './index.module.css';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div
      className={classnames(
        'relative h-60 overflow-hidden bg-[#ffebbf]',
        style.headerBgLine
      )}
    >
      <div
        className={classnames(
          'absolute right-28 bottom-0 h-[213px] w-[359px] md:-right-[300px]',
          style.headerBgGraph
        )}
      ></div>

      <div className="relative mx-auto w-[1200px] pt-10 text-sm  md:w-full md:px-2">
        <div className="h-[40px] text-4xl font-semibold md:-right-[300px]">
          {/* {t('academe:academic_research_cooperation')} */}
          开源软件选型评估服务
        </div>
        <div
          className={classnames(
            'line-clamp-3 mt-4 mb-4 h-16 max-w-3xl text-base md:-right-[300px]',
            style.headerdsc
          )}
        >
          提供三大功能：评估已知软件、推荐候选软件和查找相似功能替代软件，助力用户高效选择合适的软件。
          {/* {t('academe:academic_research_desc')} */}
        </div>
        <div className="flex gap-4">{/* <Coutact /> */}</div>
      </div>
    </div>
  );
};

export default Banner;

// const Banner = () => {
//   return (
//     <div className={`${styles.headerBgLine} py-16`}>
//       <div className="mx-auto max-w-6xl px-4">
//         <div className="text-center">
//           <h1 className="mb-4 text-4xl font-bold text-gray-800">
//             开源软件选型引擎
//           </h1>
//           <p className="text-lg text-gray-600">
//             智能推荐最适合您需求的开源软件解决方案
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
