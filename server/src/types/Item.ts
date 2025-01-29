import {
  Item,
  ItemOptionParameter,
  ItemImage,
  ItemSpec,
  User,
  Category
} from "@prisma/client";

type Specification = {
  [k in string]: string;
};

type Options = keyof typeof ItemOptionParameter;

type TGroupOptionColor = {
  [k in Extract<Options, 'COLOR'>]: string[];
}

type TGroupOption = TGroupOptionColor & {
  [k in Exclude<Options, 'COLOR'>]: string;
};

type TItemOption = {
  [k in Options]: string;
}

type TItemReviewFromDB = {
  id: number;
  rating: number;
  text: string;
  user: Pick<User, 'name' | 'lastName'>;
  item: Pick<Item, 'name'>;
  createdAt: Date;
}

type TItemReviewResponse = {
  avgRating: number;
  reviewsQty: number;
  reviews: Array<Omit<TItemReviewFromDB, 'user' | 'item'> & {
    user: string;
  }>
}

type TItemDB = Item & {
  itemSpecification: any;
  category: {
    id: number;
    url: string;
  };
  itemImage: ItemImage;
  itemStock: {
    stockQty: number;
  };
  forSale: null | {
    itemId: number;
  };
  bestSeller: null | {
    itemId: number;
  };
  itemOur: null | {
    itemId: number;
  };
  groupOptions: Array<{
    groupOption: keyof typeof ItemOptionParameter;
    groupOptionValue: string;
    groupOptionValueAdd: string;
    itemId: number;
    itemGroupKey: string;
  }>,
  review?: TItemReviewFromDB[]
};

type TItemGroupByProp = Pick<TItemDB, 'id' | 'url'> & {
  [k in keyof TGroupOption]?: TGroupOption[k];
};

type TItemGroupOption = {
  [k in keyof TGroupOption]: TItemGroupByProp[];
};

type TItemGroupDB = {
  item: Pick<Item, 'id' | 'url'> & { category: { url: string } },
  groupOption: Options;
  groupOptionValue: string;
  groupOptionValueAdd: string;
}

type TItemResponseDB = Omit<TItemDB, 'review' | 'itemSpecification' | 'groupOptions'> & {
  specification: any;
  itemOptions: TItemOption;
  itemGroupOptions: TItemGroupOption,
  review?: TItemReviewResponse;
};

type TItemResponseDBWithTimer = {
  items: TItemResponseDB[],
  timerEnds: Date;
}

type TItemResponse = {
  id: string;
  name: string;
  url: string;
  price: number;
  priceDiscount: number;
  discount: number;
  stock: boolean;
  brandId: number;
  category: Pick<Category, 'id' | 'url'>;
  groupKey: string;
  specification: Specification;
  images: string[];
  itemOptions: TItemOption;
  itemGroupOptions: TItemGroupOption;
  isNew: boolean;
  createdAt: Date;
  forSale?: boolean;
  bestSeller?: boolean;
  ourItem?: boolean;
  review?: TItemReviewResponse;
};

type TItemResponseWithTimer = {
  items: TItemResponse[],
  timerEnds: Date;
}

export type {
  TItemGroupByProp,
  TItemGroupOption,
  TItemDB,
  TItemResponse,
  TItemReviewFromDB as TItemReview,
  TItemResponseDBWithTimer,
  TItemResponseWithTimer,
  TGroupOption,
  TItemReviewResponse,
  TItemResponseDB,
  TItemGroupDB,
  TItemOption
};