import '@/styles/globals.scss';
import '@/styles/prism-tomorrow.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
