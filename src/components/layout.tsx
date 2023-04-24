import Head from "next/head";
import Image from 'next/image';
import { ReactNode } from "react";

import Link from "next/link";

type Props = {
  children?: ReactNode
  title?: string
  home?: boolean
}

const name = 'Wen Zhu';

export const SITE_TITLE = 'Wen Zhu';

const Layout = ({ children, home }: Props) => (
  <div className='max-w-xl px-4 mx-auto my-24 font-mono'>
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
    <header className='flex flex-col items-center'>
      {home ? (
        <>
          <Image
            priority
            src="/images/me.png"
            className='rounded-full'
            height={144}
            width={144}
            alt="Profile picture"
          />
          <h1 className='text-2xl mt-4 mb-12 font-bold'>{name}</h1>
        </>
      ) : ''}
    </header>
    <main>{children}</main>
    {!home && (
      <div className='my-4'>
        <Link href="/">← Back to home</Link>
      </div>
    )}
  </div>
);

export default Layout;