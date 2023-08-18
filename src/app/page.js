import React from 'react';
import { getBlogPostList } from '@/helpers/file-helpers';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';

export async function generateMetadata() {
  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  };
}

async function Home() {
  const blogPosts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {blogPosts.map((blogPost) => {
        return (
          <BlogSummaryCard
            key={blogPost.slug}
            slug={blogPost.slug}
            title={blogPost.title}
            abstract={blogPost.abstract}
            publishedOn={blogPost.publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
