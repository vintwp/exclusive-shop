

// #region ItemService

import {
  TItemReview,
  TItemReviewResponse,
  TItemDB,
  TGroupOption,
  TItemGroupByProp,
  TItemGroupOption,
  TItemGroupDB,
  TItemResponseDB,
  TItemOption,
} from "../../src/types/Item";


function createReview(review: TItemReview[]): TItemReviewResponse {
  const reviewsQty = review.length;
  const totalPointsRating = review.reduce((total, point) => total + point.rating, 0);

  if (!reviewsQty) {
    return {
      avgRating: 0,
      reviewsQty: 0,
      reviews: [],
    }
  }
  
  const reviews = review.map(rev => {
    return {
      id: rev.id,
      rating: rev.rating,
      text: rev.text,
      user: `${rev.user.name} ${rev.user.lastName}`,
      createdAt: rev.createdAt,
    }
  })
  const avgRating = +(totalPointsRating / reviewsQty).toFixed(1);

  return {
    avgRating,
    reviewsQty,
    reviews,
  }

}

function createItemsOption(item: TItemDB, itemsGroupByKeyFromDB: TItemGroupDB[]): TItemGroupOption {
  const itemOptions = item.groupOptions.reduce((totalOpt, opt) => {
    const optionName = opt.groupOption;
    const optionValue = opt.groupOptionValue;
    const colorHex = opt.groupOptionValueAdd;

    if (optionName === 'COLOR') {
      totalOpt['COLOR'] = [optionValue, colorHex];

      return totalOpt
    }

    totalOpt[optionName] = optionValue;

    return totalOpt;
    
  }, {} as TGroupOption);

  const group = itemsGroupByKeyFromDB.reduce((group, item) => {
    const {
      groupOption,
      groupOptionValue,
      groupOptionValueAdd,
      item: itemDB
    } = item;

    const itemIdx = group.findIndex(item => item.id === itemDB.id);

    if (itemIdx !== -1) {
      const existItem = group[itemIdx];
      const updatedExxistItem = {
        ...existItem,
        [groupOption]: groupOption === 'COLOR'
          ? [groupOptionValue, groupOptionValueAdd]
          : groupOptionValue
      };

      group.splice(itemIdx, 1, updatedExxistItem);
      
      return group;
    }

    const itemToAdd = {
      id: itemDB.id,
      url: `${itemDB.category.url}/${itemDB.url}`,
      [groupOption]: groupOption === 'COLOR'
        ? [groupOptionValue, groupOptionValueAdd]
        : groupOptionValue,
    };

    group.push(itemToAdd)


    return group;
  }, [] as Array<{ id: number, url: string } & Partial<TGroupOption>>);

  const uniqueGroupOptions = itemsGroupByKeyFromDB.reduce((total, itm) => {
    if (
      total.some(option => option.toLowerCase() === itm.groupOption.toLowerCase())
    ) {
      return total;
    }

    return [...total, itm.groupOption];

  }, [] as Array<keyof TGroupOption>);

  const uniqueGroupValuesByOption = itemsGroupByKeyFromDB.reduce((total, itm) => {
    const option = itm.groupOption;
    const optionValue = itm.groupOptionValue;

    if (total[option]) {
      if (total[option].includes(optionValue)) {
        return total;
      }

      total[option] = [...total[option], optionValue];

      return total;
    }

    total[option] = [optionValue];

    return total;

  }, {} as { [k in keyof TGroupOption]: Array<string> });
  
  const groupOptions = Object.keys(uniqueGroupValuesByOption) as Array<keyof TGroupOption>;
  
  const itemWithEqualOptionValueForCurrentOption = groupOptions.reduce((totalOpt, option) => {

    // for ex. item with storage and color options (128 White). 
    // So for 128, 256, 512 should be links to items with white color
    // for colors should be items with 128 storage
    // input tems is 128 white
    
    const optionValues = uniqueGroupValuesByOption[option]; // 128, 256, 512 available
    const optionsExceptCurrent
      = uniqueGroupOptions.filter(p => p !== option);
    
    const resultGroup: TItemGroupByProp[] = [];
    
    for (const optionValue of optionValues) {
      // find current item

      const itemToAdd: TItemGroupByProp = group.find(itm => {

        // find in next options with equal to item
        for (const nextOption of optionsExceptCurrent) {
          if (nextOption === 'COLOR') {
  
            if (itm[nextOption][0] !== itemOptions[nextOption][0]) {
              return false;
            };
            
            continue;
          }

          if (itm[nextOption] !== itemOptions[nextOption]) {
            return false;
          };
        }

        // find in current option

        if (option === 'COLOR') {
          // if current item 
          return itm[option][0] === optionValue;
        }

        return itm[option] === optionValue;

      });

      if (!itemToAdd) {
        const itemWithApproximateNextOption = group.find(itm => {
          if (option === 'COLOR') {
            return itm[option][0] === optionValue;
          }

          return itm[option] === optionValue;
        });

        resultGroup.push(itemWithApproximateNextOption);

        continue;
      }

      resultGroup.push(itemToAdd);
    }
    
    totalOpt[option] = [...resultGroup];

    return totalOpt
  }, {} as TItemGroupOption)

  return itemWithEqualOptionValueForCurrentOption;
}

function createResponseItemFromDB(item: TItemDB, itemsGroupByKeyFromDB: TItemGroupDB[]): TItemResponseDB {
  const itemGroupOptions = createItemsOption(item, itemsGroupByKeyFromDB);
  const review = createReview(item.review);

  const itemOptions = item.groupOptions.reduce((totalItemOptions, option) => {
    const optionName = option.groupOption;
    const optionValue = option.groupOptionValue;

    totalItemOptions[optionName] = optionValue;

    return totalItemOptions;
  }, {} as TItemOption);

  const res: TItemResponseDB = {
    id: item.id,
    name: item.name,
    url: item.url,
    price: item.price,
    priceDiscount: item.priceDiscount,
    categoryId: item.categoryId,
    brandId: item.brandId,
    groupKey: item.groupKey,
    specification: item.itemSpecification,
    review: review,
    itemOptions: itemOptions,
    itemGroupOptions: itemGroupOptions,
    category: item.category,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    forSale: item.forSale,
    bestSeller: item.bestSeller,
    itemOur: item.itemOur,
    itemStock: item.itemStock,
    itemImage: item.itemImage,
    itemImageId: item.itemImageId,
  };

  return res;
}

// #endregion


export {
  createReview,
  createItemsOption,
  createResponseItemFromDB,
}