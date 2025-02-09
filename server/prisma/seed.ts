import { createUsers } from "./seed/users";
import { createStores } from "./seed/stores";
import { createCategories } from "./seed/categories";
import { createBrands } from "./seed/brands";
import { createItems } from "./seed/items";
import { createColors } from './seed/colors';
import { createReviews } from "./seed/reviews";
import { createFlashSales } from "./seed/flashSales";
import {
  createPromoBanner,
  createPromoCategoryBanner,
  createPromoNewArrival,
} from "./seed/promo";
import { createContacatMessages } from "./seed/contactMessages";

const seed = async () => {
  await createUsers();
  await createColors();
  await createStores();
  await createCategories();
  await createBrands();
  await createItems();
  await createReviews();
  await createFlashSales();
  await createPromoBanner();
  await createPromoCategoryBanner();
  await createPromoNewArrival();
  await createContacatMessages();
}

seed();