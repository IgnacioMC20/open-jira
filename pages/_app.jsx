
import { CssBaseline, ThemeProvider } from '@mui/material'
import { EntriesProvider } from '../context/entries/EntriesProvider'
import { UIProvider } from '../context/ui'
import '../styles/globals.css'
import { darkTheme, lightTheme } from '../themes'

function MyApp({ Component, pageProps }) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}

export default MyApp
