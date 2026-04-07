import React from 'react';
import { Card } from 'antd';
import JourneyPanoramaFlow from './JourneyPanoramaFlow';
import { UserJourneyProjectView } from '../types';

type ComparePanoramaCardProps = {
  projects: UserJourneyProjectView[];
};

const ComparePanoramaCard: React.FC<ComparePanoramaCardProps> = ({
  projects,
}) => {
  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className="mb-5 text-xl font-semibold text-slate-900">
        旅程体验全景图
      </div>
      <div className="space-y-7">
        {projects.map((project, index) => (
          <div
            key={project.queryKey}
            className={index > 0 ? 'border-t border-slate-100 pt-7' : ''}
          >
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900">
                  {project.data.projectInfo.name}
                </div>
                {project.data.projectInfo.version ? (
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
                    {`${project.data.projectInfo.version}`}
                  </div>
                ) : null}
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <JourneyPanoramaFlow
              steps={project.data.journeySteps}
              className="mt-6"
              compact
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ComparePanoramaCard;
