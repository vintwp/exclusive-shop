import { extractDataForSearchLibrary } from "../lib";
import Fuse from "fuse.js";
import { TSearch } from "../types";

const fuseOptions = {
  threshold: 0.3,
  keys: ['name'],
};

const fuse = new Fuse([], fuseOptions);

const addSearchLibrary = async () => {
  const stores = await prisma.store.findMany();
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  const prepraredLibrary = extractDataForSearchLibrary(stores, categories, brands);

  fuse.setCollection(prepraredLibrary);
};

addSearchLibrary();

class Search {
  async getSeach(searchquery: string) {
    const result = fuse.search<TSearch>(searchquery);

    return result;
  }
}

export default new Search()