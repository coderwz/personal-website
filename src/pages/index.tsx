import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { getSortedPostsData } from '@/utils/fetch-posts-data';
import { PostData } from '@/types/post';
import { GetStaticProps } from 'next';
import Layout, { SITE_TITLE } from '@/components/layout';
import utilStyles from '@/styles/utils.module.scss';
import FormattedDate from '@/components/date';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  allPostsData: PostData[],
};

const Home = ({ allPostsData }: Props) => (<Layout home>
  <Head>
    <title>{SITE_TITLE}</title>
  </Head>
  <section className={utilStyles.headingMd}>
    <p>Hi, welcome to my website.</p>
  </section>

  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className={utilStyles.headingLg}>Blog</h2>
    <ul className={utilStyles.list}>
      {allPostsData.map(({ slug, date, title }) => (
        <li className={utilStyles.listItem} key={slug}>
          <Link href={`/posts/${slug}`}>{title}</Link>
          <br />
          <small className={utilStyles.lightText}>
            <FormattedDate dateString={date} />
          </small>
        </li>
      ))}
    </ul>
  </section>
</Layout>);

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default Home;