import type { AppProps } from 'next/app'
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import './style.css'

export default function App({ Component, pageProps }: AppProps) {

    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}