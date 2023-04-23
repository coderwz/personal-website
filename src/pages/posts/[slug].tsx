import FormattedDate from "@/components/date";
import Layout from "@/components/layout";
import { PostData } from "@/types/post";
import { getAllPostSlugs, getPostBySlug } from "@/utils/fetch-posts-data";
import { GetStaticPaths } from "next";
import Head from "next/head";

type Props = {
  postData: PostData;
};

const Post = ({ postData }: Props) => (<Layout>
  <Head>
    <title>{postData.title}</title>
  </Head>
  <article>
    <h1 className='text-3xl font-bold underline mb-4'>{postData.title}</h1>
    <div className='text-gray-500'>
      <FormattedDate dateString={postData.date} />
    </div>
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className="mt-4" />
  </article>
</Layout>);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false,
  };
};

type Params = {
  params: {
    slug: string
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const postData = await getPostBySlug(params.slug);

  return {
    props: {
      postData,
    },
  };
};

export default Post;