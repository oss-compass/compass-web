import React from 'react';

if (process.env.NODE_ENV === 'development') {
  console.debug('Applying whyDidYouRender');
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOwnerReasons: true,
    collapseGroups: true,
  });
}
