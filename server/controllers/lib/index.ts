import {
  TItemResponseDB,
  TItemResponse
} from "../../src/types/Item";


const IS_NEW_ITEM_DAYS = 5;

function isNewItem(dateOfCreation: Date, newItemDays = IS_NEW_ITEM_DAYS) {
  const currentDate = new Date().getTime();
  const createdDate = new Date(dateOfCreation).getTime();

  const daysOfLife = Math.round(
    Math.abs(currentDate - createdDate) / (1000 * 3600 * 24),
  );

  return daysOfLife <= newItemDays;
};

function createItemResponseFromServer<T extends (TItemResponseDB | TItemResponseDB[])>(
  data: T,
): T extends TItemResponseDB[] ? TItemResponse[] : TItemResponse
function createItemResponseFromServer<T extends TItemResponseDB>(data: T) {
  const calculateDiscountPercentage = (originalPrice: number, priceDiscount: number) => {
    if (originalPrice === priceDiscount) {
      return 0;
    }
  
    const discount
      = Math.round(((originalPrice - priceDiscount) / originalPrice) * 100);
  
    return discount;
  };

  const createResponse = (item: TItemResponseDB): TItemResponse => {
    const discount = calculateDiscountPercentage(item.price, item.priceDiscount);
    const isNew = isNewItem(item.createdAt);

    const itemResponse = {
      id: `${item.id}`,
      name: item.name,
      url: `${item.category.url}/${item.url}`,
      price: item.price,
      priceDiscount: item.priceDiscount,
      discount: discount,
      stock: item.itemStock.stockQty > 0,
      category: {
        ...item.category
      },
      brandId: item.brandId,
      groupKey: item.groupKey,
      specification: item.specification.specification,
      images: item.itemImage.images,
      itemOptions: item.itemOptions,
      itemGroupOptions: item.itemGroupOptions,
      forSale: item.forSale ? true : false,
      bestSeller: item.bestSeller ? true : false,
      itemOur: item.itemOur ? true : false,
      review: item.review,
      isNew: isNew,
      createdAt: item.createdAt,
    };

    return itemResponse;
  }
  
  if (Array.isArray(data)) {
    const reponseItems = data.map(item => {
      const resItem = createResponse(item);

      return resItem;
    });

    return reponseItems;
  }

  const responseItem = createResponse(data);

  return responseItem;
}

export { createItemResponseFromServer };