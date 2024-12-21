import { TSearch } from "../types";

export const extractDataForSearchLibrary = <T extends TSearch>(...args: T[][]) => {

  const preparedData = args.reduce((acc, item) => {
    const preparedItems = item.map((itemData) => {
      return {
        id: itemData.url,
        name: itemData.name,
        url: itemData.url,
      }
    });

    acc = [...acc, ...preparedItems];

    return acc

    
  }, [] as TSearch[])


  return preparedData;
};
