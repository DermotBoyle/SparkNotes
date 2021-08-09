import 'core-js/modules/es.promise'
import 'core-js/modules/es.array.iterator'
import { AppWrapper } from 'context/global-state'
import 'styles/globals.scss'

function MyApp ({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
