jest.isolateModules(() => {
  const preloadAll = require('jest-next-dynamic')
  beforeAll(async () => {
    await preloadAll()
  })
})

import '@testing-library/jest-dom/extend-expect'
require('jest-fetch-mock').enableMocks()
