
type Specification = {
  [k in string]: string;
}

type TItemGroup = {
  groupName: string;
  optionKeys: string[];
}

type TInitialItemGroups = {
  [k in string]: TItemGroup;
};

type TInitialItemImages = {
  [k in string]: {
    [p in string]: string[]
  }
};

type TinitialItems = {
  id?: number;
  name: string;
  url: string;
  brandId: number;
  categoryId: number;
  storeId: number;
  price: number;
  priceDiscount: number;
  ourItem: boolean;
  itemGroup: TItemGroup;
  itemImages?: string[];
  stockQty?: number;
  forSale?: boolean;
  bestSeller?: boolean;
  spec?: Specification;

}

export type { Specification, TInitialItemGroups, TInitialItemImages, TinitialItems }