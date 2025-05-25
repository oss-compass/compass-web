import React, { useState } from 'react';
import ScenarioCards from '../ScenarioCards';
import AssessmentSection from '../AssessmentSection';
import RecommendationSection from '../RecommendationSection';
import SimilarSoftwareSection from '../SimilarSoftwareSection';
import ReportsSection from '../ReportsSection';
import CompareModal from '../CompareModal';

type SectionType =
  | 'landing'
  | 'assessment'
  | 'recommendation'
  | 'similar'
  | 'reports';

const MainContent = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>('landing');
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleSectionChange = (section: SectionType) => {
    setCurrentSection(section);
  };

  const handleSoftwareSelect = (softwareId: string) => {
    setSelectedSoftware((prev) => {
      if (prev.includes(softwareId)) {
        return prev.filter((id) => id !== softwareId);
      } else {
        return [...prev, softwareId];
      }
    });
  };

  const handleCompare = () => {
    setShowCompareModal(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {currentSection === 'landing' && (
        <ScenarioCards onSectionChange={handleSectionChange} />
      )}

      {currentSection === 'assessment' && (
        <AssessmentSection
          onBack={() => handleSectionChange('landing')}
          onSoftwareSelect={handleSoftwareSelect}
          selectedSoftware={selectedSoftware}
        />
      )}

      {currentSection === 'recommendation' && (
        <RecommendationSection
          onBack={() => handleSectionChange('landing')}
          onSoftwareSelect={handleSoftwareSelect}
          selectedSoftware={selectedSoftware}
        />
      )}

      {currentSection === 'similar' && (
        <SimilarSoftwareSection
          onBack={() => handleSectionChange('landing')}
          onSoftwareSelect={handleSoftwareSelect}
          selectedSoftware={selectedSoftware}
        />
      )}

      {currentSection === 'reports' && (
        <ReportsSection onBack={() => handleSectionChange('landing')} />
      )}

      {/* 对比按钮 */}
      {selectedSoftware.length > 0 && currentSection !== 'landing' && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={handleCompare}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-600"
          >
            <span>对比软件</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-blue-500">
              {selectedSoftware.length}
            </span>
          </button>
        </div>
      )}

      {/* 对比模态框 */}
      <CompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        selectedSoftware={selectedSoftware}
      />
    </div>
  );
};

export default MainContent;
