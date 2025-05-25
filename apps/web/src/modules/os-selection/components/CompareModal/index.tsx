import React from 'react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSoftware: string[];
}

const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  selectedSoftware,
}) => {
  if (!isOpen) return null;

  const mockComparisonData = [
    {
      metric: '项目名称',
      software1: 'Apache ShardingSphere',
      software2: 'Seata',
    },
    {
      metric: '开源协议',
      software1: 'Apache-2.0',
      software2: 'Apache-2.0',
    },
    {
      metric: 'GitHub Stars',
      software1: '18k',
      software2: '24k',
    },
    {
      metric: '活跃度',
      software1: '★★★★☆',
      software2: '★★★★★',
    },
    {
      metric: '最后更新',
      software1: '3 天前',
      software2: '1 天前',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-11/12 max-w-4xl overflow-y-auto rounded-lg bg-white p-8">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">软件对比</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b-2 border-gray-200 p-3 text-left">
                  对比项
                </th>
                <th className="border-b-2 border-gray-200 p-3 text-left">
                  软件 1
                </th>
                <th className="border-b-2 border-gray-200 p-3 text-left">
                  软件 2
                </th>
              </tr>
            </thead>
            <tbody>
              {mockComparisonData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="border-b border-gray-100 p-3 font-medium">
                    {row.metric}
                  </td>
                  <td className="border-b border-gray-100 p-3">
                    {row.software1}
                  </td>
                  <td className="border-b border-gray-100 p-3">
                    {row.software2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
