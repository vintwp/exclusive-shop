const IOption = {
  COLOR: 'COLOR',
  STORAGE: 'STORAGE',
  VOLUME: 'VOLUME',
  WHEEL_DIAMETER: 'WHEEL_DIAMETER',
  TYPE: 'TYPE',
  SIZE: 'SIZE',
} as const;

type Specification = {
  [k in string]: string;
};

type TItemOption = {
  [k in keyof typeof IOption]: string;
};

type IItemGroupByProp = {
  id: string;
  url: string;
} & {
  [k in keyof typeof IOption]: k;
};

type TItemGroup = {
  [k in keyof typeof IOption]: IItemGroupByProp[];
};

type Review = {
  avgRating: number;
  reviewsQty: number;
  reviews: Array<{
    id: number;
    text: string;
    rating: number;
    user: string;
    createdAt: Date;
  }>;
};

type Item = {
  id: string;
  name: string;
  url: string;
  price: number;
  priceDiscount: number;
  discount: number;
  ourItem: boolean;
  stock: boolean;
  brandId: number;
  category: {
    id: number;
    url: string;
  };
  groupKey: string;
  specification: Specification;
  itemOptions: TItemOption;
  itemGroupOptions: TItemGroup;
  images: string[];
  isNew: boolean;
  createdAt: Date;
  review: Review;
  forSale?: boolean;
  bestSeller?: boolean;
};

export { type Item as TItem, IOption };
