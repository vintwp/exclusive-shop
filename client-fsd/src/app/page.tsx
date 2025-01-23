import {
  BestSellers,
  BrowseByCategory,
  StoresList,
  FlashSales,
} from '@/widgets';

export default async function Home() {
  return (
    <>
      <StoresList />
      <FlashSales />
      <BrowseByCategory />
      <BestSellers />
    </>
  );
}
