import Head from 'next/head';
import type { AppProps } from 'next/app';
/* import Header from '@/components/Header'; */
import Footer from '@/components/Footer';
import './global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      {/* <Header /> */}
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;