import { getStore } from '@/entities/Store';

export async function generateStaticParams() {
  const stores = await getStore();

  return posts.map(post => ({
    slug: post.slug,
  }));
}
