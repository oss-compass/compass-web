import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const DataView = () => {
  return (
    <>
      <SwaggerUI url="http://159.138.38.244:7000/api/v2/docs" />
    </>
  );
};

export default DataView;
