import React from 'react';
import Banner from './Banner';
import Introduce from './Introduce';
import Board from './10Board';
import Members from './20Members';
import TechnicalCommittee from './30TechnicalCommittee';
import OutreachCommittee from './40OutreachCommittee';
import AssessmentModelWorkingGroup from './50AssessmentModelWorkingGroup';
import AIWorkingGroup from './55AIWorkingGroup';
import SaaSWorkingGroup from './60SaaSWorkingGroup';

const About = () => {
  return (
    <>
      <Banner />
      <div className="py-20">
        <div className="mx-auto  w-[1000px] md:w-full md:px-4">
          <Introduce />
          <Board />
          <Members />
          <TechnicalCommittee />
          <OutreachCommittee />
          <AssessmentModelWorkingGroup />
          <AIWorkingGroup />
          <SaaSWorkingGroup />
        </div>
      </div>
    </>
  );
};

export default About;
