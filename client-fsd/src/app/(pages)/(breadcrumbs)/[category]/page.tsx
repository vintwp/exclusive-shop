import { getCategory } from '@/entities/Category';

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategory();
  const categoriesToRender = categories.ok ? categories.data : [];

  return categoriesToRender.map(category => ({
    category: category.url,
  }));
}

export default function Category({ params }: { params: { category: string } }) {
  return <h1>{params.category}</h1>;
}
