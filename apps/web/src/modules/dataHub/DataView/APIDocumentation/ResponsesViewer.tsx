import React from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { getLocalizedText } from '@modules/dataHub/utils';
const { Panel } = Collapse;

interface ResponsesViewerProps {
  responses: Record<string, any>;
}

const ResponsesViewer: React.FC<ResponsesViewerProps> = ({ responses }) => {
  const { i18n } = useTranslation();

  if (Object.keys(responses).length === 0) {
    return <></>;
  }
  const renderResponse = (data: any, parentKey: string = '') => {
    return (
      <ul className="pl-4">
        {Object.entries(data).map(([key, rowValue]) => {
          const value: any = rowValue;
          const hasChildren =
            typeof value === 'object' &&
            value !== null &&
            value.items &&
            Object.keys(value.items).length > 0;

          return (
            <li key={`${parentKey}.${key}`} className="mb-2">
              <div className="flex items-center">
                {hasChildren ? (
                  <Collapse className="responses" ghost>
                    <Panel
                      header={
                        <>
                          <span className="font-bold text-gray-700">
                            {key}:
                          </span>
                          <span className="ml-2 font-normal text-gray-700">
                            {Object.keys(value.items).length} properties
                          </span>
                        </>
                      }
                      key={key}
                    >
                      {renderResponse(
                        value.items || value.properties || value,
                        key
                      )}
                    </Panel>
                  </Collapse>
                ) : (
                  <>
                    <span className="font-bold text-gray-800">{key}:</span>
                    {value?.description && (
                      <span className="ml-2 text-gray-700">
                        {getLocalizedText(value.description, i18n.language)}
                      </span>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="">
      <h2 className="mb-4 text-lg font-bold">Responses</h2>
      <Collapse className="responses-top">
        <Panel header="Root" key="response-structure">
          {renderResponse(responses)}
        </Panel>
      </Collapse>
    </div>
  );
};

export default ResponsesViewer;
