import RSS from 'rss';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';

export async function GET(request) {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    // TODO: Use an actual domain name here
    feed_url: 'http://localhost:3000/rss.xml',
    site_url: 'http://localhost:3000',
  });

  const blogPosts = await getBlogPostList();

  blogPosts.map((blogPost) => {
    feed.item({
      title: blogPost.title,
      description: blogPost.abstract,
      // TODO: Use an actual domain name here
      url: `http://localhost:3000/${blogPost.slug}`,
      date: blogPost.publishedOn,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
