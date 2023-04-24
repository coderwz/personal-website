import FormattedDate from '@/components/date';
import Layout, { SITE_TITLE } from '@/components/layout';
import { PostData } from '@/types/post';
import { getSortedPostsData } from '@/utils/fetch-posts-data';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  allPostsData: PostData[],
};

const Home = ({ allPostsData }: Props) => (<Layout home>
  <Head>
    <title>{SITE_TITLE}</title>
  </Head>

  <section>
    <ul className='list-none p-0 m-0'>
      {allPostsData.map(({ slug, date, title, summary }) => (
        <li className='mb-12' key={slug}>
          <Link href={`/posts/${slug}`} className='text-3xl font-bold'>{title}</Link>
          <br />
          <small className='text-gray-lite'>
            <FormattedDate dateString={date} />
          </small>
          <p className='text-gray-lite text-sm mt-1'>{summary}</p>
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