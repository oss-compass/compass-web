const path = require('path');
const config = require('../../tailwind.config');

const ui = path.join(
  path.dirname(require.resolve('@oss-compass/ui')),
  '**/*.{js,jsx,ts,tsx}'
);

module.exports = {
  ...config,
  content: ['./src/**/*.{js,ts,jsx,tsx}', ui],
};
