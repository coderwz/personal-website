import FormattedDate from '@/components/date';
import Layout, { SITE_TITLE } from '@/components/layout';
import { PostData } from '@/types/post';
import { getSortedPostsData } from '@/utils/fetch-posts-data';
import { GetStaticProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  allPostsData: PostData[],
};

const Home = ({ allPostsData }: Props) => (<Layout home>
  <Head>
    <title>{SITE_TITLE}</title>
  </Head>
  <section className='text-xl'>
    <p>Hi, welcome to my website.</p>
  </section>

  <section>
    <h2 className='text-2xl py-4'>Blog</h2>
    <ul className='list-none p-0 m-0'>
      {allPostsData.map(({ slug, date, title }) => (
        <li className='mb-5' key={slug}>
          <Link href={`/posts/${slug}`}>{title}</Link>
          <br />
          <small className='text-gray-500'>
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