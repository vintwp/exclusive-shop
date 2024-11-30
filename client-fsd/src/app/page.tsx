import { getStore } from '@/entities/Store';
import { Container } from '@/shared/ui';
import { BrowseByCategory } from '@/widgets';
import Link from 'next/link';

export default async function Home() {
  const stores = await getStore();

  return (
    <div>
      <Container>
        <div className="flex">
          <div className="border-r-[1px] border-clr-text-2/25 pb-12 pt-4 lg:pb-32 lg:pr-4 lg:pt-10">
            {stores.ok &&
              stores.data.map(store => (
                <Link
                  key={store.name}
                  className="block capitalize"
                  href={`${store.url}`}
                >
                  {store.name}
                </Link>
              ))}
          </div>
          <div className="pb-12 pt-4 lg:pb-32 lg:pl-11 lg:pt-10">right</div>
        </div>
      </Container>
      <Container>
        <BrowseByCategory />
      </Container>
    </div>
  );
}
