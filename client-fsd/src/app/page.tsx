import { getStore } from '@/entities/Store';
import { Container } from '@/shared/ui';
import { BrowseByCategory, StoresList } from '@/widgets';

export default async function Home() {
  const stores = await getStore();

  return (
    <div>
      <Container>
        <StoresList stores={stores.ok ? stores.data : []} />
      </Container>
      <Container>
        <BrowseByCategory />
      </Container>
    </div>
  );
}
