import {
  BestSellers,
  BrowseByCategory,
  StoresList,
  FlashSales,
  OurItems,
  Benefits,
  PromoNewArrival,
} from '@/widgets';
import { PromoCategory } from '@/widgets/PromoCategory';

export default async function Home() {
  return (
    <>
      <StoresList />
      <FlashSales />
      <BrowseByCategory />
      <BestSellers />
      <PromoCategory />
      <OurItems />
      <PromoNewArrival />
      <div className="mb-8 lg:mb-16">
        <Benefits />
      </div>
    </>
  );
}
