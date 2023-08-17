import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

import dynamic from 'next/dynamic';

const CircularColorsDemo = dynamic(() =>
  import('@/components/CircularColorsDemo/CircularColorsDemo')
);
const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo/DivisionGroupsDemo')
);

import styles from './postSlug.module.css';

export const getBlogPost = React.cache(async (postSlug) => {
  return loadBlogPost(postSlug);
});

export async function generateMetadata({ params }) {
  const { frontmatter } = await getBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await getBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            CircularColorsDemo,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
