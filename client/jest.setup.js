// import '@testing-library/jest-dom'; // Provides extended matchers for jest
// import { expect } from '@jest/globals'; // Explicitly import expect if not auto-included

import 'whatwg-fetch';

// Mock `import.meta.env` for Jest
global.import = {
  meta: {
    env: {
      VITE_API_APP_HOST: 'http://localhost:3000',
    },
  },
};
