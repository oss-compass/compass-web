import React from 'react';
import JourneyPanoramaFlow from './JourneyPanoramaFlow';
import RecommendationsSection from './RecommendationsSection';
import { JourneyRecommendation, JourneyStep } from '../types';

type JourneyPanoramaSectionProps = {
  projectName: string;
  recommendations: JourneyRecommendation[];
  steps: JourneyStep[];
};

const JourneyPanoramaSection: React.FC<JourneyPanoramaSectionProps> = ({
  projectName,
  recommendations,
  steps,
}) => {
  return (
    <div className="mt-2 border-slate-100 pt-5">
      <div className="mb-3">
        <div className="text-xl font-semibold text-slate-900">旅程体验全景图</div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white px-4 py-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:px-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900">
              {projectName}
            </div>
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <JourneyPanoramaFlow steps={steps} className="mt-6" />

        <div className="border-slate-100pt-5 mt-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-900">
                改进建议
              </div>
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <RecommendationsSection
            recommendations={recommendations}
            className="mt-4 px-3 "
            showHeader={false}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
};

export default JourneyPanoramaSection;
