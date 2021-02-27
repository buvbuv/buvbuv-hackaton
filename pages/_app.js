import '../styles/globals.css'
import Layout from '../components/Layout'
import { debugContextDevtool } from 'react-context-devtool';


function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
