import FormattedDate from "@/components/date";
import Layout from "@/components/layout";
import { PostData } from "@/types/post";
import { getAllPostSlugs, getPostBySlug } from "@/utils/fetch-posts-data";
import { GetStaticPaths } from "next";
import Head from "next/head";
import utilStyles from "@/styles/utils.module.scss";

type Props = {
  postData: PostData
};

const Post = ({ postData }: Props) => (<Layout>
  <Head>
    <title>{postData.title}</title>
  </Head>
  <article>
    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
    <div className={utilStyles.lightText}>
      <FormattedDate dateString={postData.date} />
    </div>
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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