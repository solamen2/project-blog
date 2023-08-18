import React from 'react';
import { getBlogPostList } from '@/helpers/file-helpers';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';

export function generateMetadata() {
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
      {blogPosts.map(({ slug, title, abstract, publishedOn }) => {
        return (
          <BlogSummaryCard
            key={slug}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
