

import {PostData} from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import {remark} from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const postsDirectory = path.join(process.cwd(), 'src/_posts');

export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => ({
                         params: {
                           slug: fileName.replace(/\.md$/, ''),
                         },
                       }));
};

export const getPostBySlug = async (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
                               .use(html, {sanitize: false})
                               .use(prism)
                               .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
};

export const getSortedPostsData = async () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
    };
  }) as PostData[];

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};