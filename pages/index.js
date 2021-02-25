import Head from 'next/head'

import CreateForm from './create'


export default function Home() {
  return (

    <div className="items-center justify-center min-h-screen py-2">

      <Head>
        <title>BuvBuv</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    

      <CreateForm/>

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

  )
}
