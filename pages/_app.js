import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { MantineProvider, ColorSchemeProvider, createEmotionCache } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { AppShell } from '@mantine/core'
import { BudgetProvider } from "context/BudgetContext"
import { ShoppingListProvider } from "context/ShoppingListContext"
import Head from 'next/head'
import NavbarMinimal from 'components/NavbarMinimal'
import HeaderMinimal from 'components/HeaderMinimal'
import LoadingScreen from 'components/shared/LoadingScreen'
import { getCookie, setCookies } from 'cookies-next'

// Client-side cache, shared for the whole session of the user in the browser.
const emotionCache = createEmotionCache({ key: 'mantine' })

function MyApp({ Component, pageProps }) {

  const initialColorScheme = getCookie('mantine-color-scheme');
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState(initialColorScheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(true);
    setTimeout(() => setLoading(true), 1000);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
        <title>My First Home</title>
        <meta name="description" content="First Home made by EchiSoftware" />
        <meta name="robots" content="index, follow" />
        {/* <link rel="canonical" href="http://divisasmdq.com/" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider  
          withNormalizeCSS
          withGlobalStyles
          emotionCache={emotionCache}
          theme={{
            colorScheme,
            breakpoints: {
              xs: 500,
              sm: 800,
              md: 1000,
              lg: 1200,
              xl: 1400,
          }}}          
        >
          <NotificationsProvider>
            <BudgetProvider>
              <ShoppingListProvider>
                {loading ?               
                    <>                
                      <AppShell
                        navbar={<NavbarMinimal opened={opened}/>}
                        header={<HeaderMinimal opened={opened} setOpened={setOpened}/>}
                        fixed
                        navbarOffsetBreakpoint="sm"
                        styles={(theme) => ({
                          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                        })}
                      >
                        <Component {...pageProps} />                
                      </AppShell>  
                    </>      
                  :
                  <LoadingScreen backgroundColor="linear-gradient(0deg, #000000, #32594A 50%, #223C39)"/>
                }             
              </ShoppingListProvider>
            </BudgetProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
    )
}

export default MyApp
