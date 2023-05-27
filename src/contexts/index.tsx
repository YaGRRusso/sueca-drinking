import { ScriptProps } from 'next/script'

import { DeckProvider } from './DeckContext'
import { ThemeProvider } from './ThemeContext'

const AppProvider = ({ children }: ScriptProps) => {
  return (
    <ThemeProvider>
      <DeckProvider>{children}</DeckProvider>
    </ThemeProvider>
  )
}
export default AppProvider
