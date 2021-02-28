import React , { useEffect } from 'react';
import { useWallet } from '../util/wallet'

export default function WalletConnect() {

    const { connected, wallet } = useWallet();
    const publicKey = wallet?.publicKey?.toBase58();

  return (
      <>
      <button onClick={connected ? wallet.disconnect : wallet.connect } 
              className="bg-purple-500 p-3 rounded"
      >
                {!connected ? 'Connect wallet' : 'Disconnect'}

      </button>
      </>
  );
}