import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

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
  let blogPost;
  try {
    blogPost = await getBlogPost(params.postSlug);
  } catch (err) {
    // assume this is always file not found for now
    notFound();
  }
  const { frontmatter } = blogPost;

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  let blogPost;
  try {
    blogPost = await getBlogPost(params.postSlug);
  } catch (err) {
    // assume this is always file not found for now
    notFound();
  }
  const { frontmatter, content } = blogPost;

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
