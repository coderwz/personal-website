import Head from "next/head";
import Image from 'next/image';
import { ReactNode } from "react";

import utilStyles from '@/styles/utils.module.scss';
import Link from "next/link";
import styles from './layout.module.scss';

type Props = {
  children?: ReactNode
  title?: string
  home?: boolean
}

const name = 'Wen Zhu';

export const SITE_TITLE = 'Wen Zhu';

const Layout = ({ children, home }: Props) => (
  <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          SITE_TITLE,
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={SITE_TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <link
        rel="stylesheet"
        href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
      /> */}
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt=""
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={108}
              width={108}
              alt=""
            />
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/" className={utilStyles.colorInherit}>
              {name}
            </Link>
          </h2>
        </>
      )}
    </header>
    <main>{children}</main>
    {!home && (
      <div className={styles.backToHome}>
        <Link href="/">← Back to home</Link>
      </div>
    )}
  </div>
);

export default Layout;