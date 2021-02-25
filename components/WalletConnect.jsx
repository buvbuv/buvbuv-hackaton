import React , {useContext}  from 'react';
import { Connection, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import  Wallet  from '@project-serum/sol-wallet-adapter';
import  WalletContext  from './WalletContext'


export default function WalletConnect() {

  const [ setwcntx ] = useContext(WalletContext);

  async function connect( setcntx ) {
    let connection = new Connection(clusterApiUrl('devnet'));
    let providerUrl = 'https://www.sollet.io';
    let wallet = new Wallet(providerUrl);

    wallet.on('connect', publicKey => {
      console.log('Connected to ' + publicKey.toBase58())
      setcntx( wallet ) 
    });

    wallet.on('disconnect', () => { 
      console.log('Disconnected') 
      setcntx( {} )
    });

    await wallet.connect();
  }

  return (

      <button onClick={() => connect(setwcntx)} 
              className="bg-purple-500 p-3"
      >
        CONNECT
      </button>

  );
}