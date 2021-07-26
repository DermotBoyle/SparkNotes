import React from 'react'
import { render } from '@testing-library/react'
import { AppWrapper } from 'context/global-state'

const AllTheProviders = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as wrapper }
