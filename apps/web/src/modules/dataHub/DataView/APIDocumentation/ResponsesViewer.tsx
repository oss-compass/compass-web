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
          // $ref 解析出的 properties 与 array 的 items 都是可展开的子结构。
          const childData =
            value?.items && Object.keys(value.items).length > 0
              ? value.items
              : value?.properties && Object.keys(value.properties).length > 0
                ? value.properties
                : null;
          const hasChildren =
            typeof value === 'object' &&
            value !== null &&
            childData !== null;

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
                            {Object.keys(childData).length} properties
                          </span>
                        </>
                      }
                      key={key}
                    >
                      {renderResponse(childData, key)}
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
