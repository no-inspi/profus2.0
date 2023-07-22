import type { AppProps } from 'next/app'
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import './style.css'

import { extendTheme } from '@chakra-ui/react'
import { modalTheme } from '../../components/Navigation/modal'

export const theme = extendTheme({
  components: { Modal: modalTheme },
})

export default function App({ Component, pageProps }: AppProps) {

    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}