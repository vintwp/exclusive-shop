import { createUsers } from "./seed/users";
import { createStores } from "./seed/stores";
import { createCategories } from "./seed/categories";
import { createBrands } from "./seed/brands";
import { createItems } from "./seed/items";
import { createColors } from './seed/colors';
import { createReviews } from "./seed/reviews";
import { createFlashSales } from "./seed/flashSales";

const seed = async () => {
  await createUsers();
  await createColors();
  await createStores();
  await createCategories();
  await createBrands();
  await createItems();
  await createReviews();
  await createFlashSales();
}

seed();