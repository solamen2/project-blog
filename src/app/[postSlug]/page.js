import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import COMPONENT_MAP from '@/helpers/mdx-components';

export async function generateMetadata({ params }) {
  let blogPost;
  try {
    blogPost = await loadBlogPost(params.postSlug);
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
    blogPost = await loadBlogPost(params.postSlug);
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
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
