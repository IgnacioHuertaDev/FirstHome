import '../styles/globals.css'
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { BudgetProvider } from "../context/BudgetContext";

function MyApp({ Component, pageProps }) {

  const lightTheme = createTheme({
    type: 'light',
  })
  
  const darkTheme = createTheme({
    type: 'dark',
  })

  return (
    <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className
        }}
      >
        <NextUIProvider>
          <BudgetProvider>
            <Component {...pageProps} />
          </BudgetProvider>
        </NextUIProvider>
      </NextThemesProvider>
    )
}

export default MyApp
