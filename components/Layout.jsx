import React from 'react'
import { Link } from 'next/link'
import   dynamic  from 'next/dynamic'
import  Head  from 'next/head'
import NavBar from './NavBar'
//import { WalletProvider } from '../util/wallet';

const WalletProvider = dynamic(() => {
      return import("../util/wallet").then((mod) => mod.WalletProvider);
    },
    { ssr: false }
  );


export default function Layout( props ) {

    return ( 

    <WalletProvider> 

    <div className="items-center justify-center min-h-screen py-2">
        <Head>
            <title>BuvBuv</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar></NavBar>

        <div id="main">
        { props.children }
        </div>
        

        <footer className="flex items-center justify-center w-full h-24 border-t">
            <a
            className="flex items-center justify-center"
            href="www://www.solana.io"
            target="_blank"
            rel="noopener noreferrer"
            >
                Powered by{' '}
                <img src="/solana.svg" alt="Solana Logo" className="h-4 ml-2" />
            </a>
        </footer>

    </div>

    </WalletProvider>
    
    )


}

