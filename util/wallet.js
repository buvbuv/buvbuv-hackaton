// mostly taken from serum-dex-ui

import React , { createContext, useContext , useMemo ,useState,  useEffect } from 'react'
import { Connection, clusterApiUrl } from '@solana/web3.js'
import dynamic from 'next/dynamic'
import Wallet from '@project-serum/sol-wallet-adapter'

const WalletContext = createContext(null)
const endpoint = new Connection(clusterApiUrl('devnet') )

export function WalletProvider({ children }) {
   
    
    const providerUrl = 'https://www.sollet.io';
    
    const wallet = useMemo( () => new Wallet(providerUrl, endpoint) , [
        providerUrl, endpoint
    ] )
  
    const [connected, setConnected] = useState(false);
      
    useEffect( async () => {

      console.log('connected : ' + connected );

      wallet.on('connect', ( publicKey ) => {
        console.log('connected');
        console.log( publicKey )
        setConnected(true);
        let walletPublicKey = wallet.publicKey.toBase58();     
        wallet.pk = walletPublicKey      
      });

      wallet.on('disconnect', () => {
        setConnected(false);
      });

      console.log(wallet)
      window.wallet = wallet;

      return () => {
        wallet.disconnect();
        setConnected(false);
      };
    }, [wallet]);
  
    return (
      <WalletContext.Provider
        value={{
          wallet,
          connected,
          providerUrl,
          endpoint
        }}
      >
        {children}
      </WalletContext.Provider>
    );
  }
  
  export function useWallet() {
    const context = useContext( WalletContext );
    if (!context) {
      throw new Error('Missing wallet context');
    }
    return {
      connected: context.connected,
      wallet: context.wallet,
      providerUrl: context.providerUrl,
      endpoint: context.endpoint
    }
  }