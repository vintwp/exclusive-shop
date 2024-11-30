export function deleteProperty<
  T extends { [k: string]: unknown },
  K extends keyof T,
>(originalObject: T, keysToDelete: K | Array<K>): Omit<T, K> {
  const keys = Object.keys(originalObject) as Array<keyof T>;

  const updatedObject = keys.reduce(
    (acc, propKey) => {
      const value = originalObject[propKey];

      if (Array.isArray(keysToDelete) && keysToDelete.includes(propKey as K)) {
        return acc;
      }

      if (propKey === keysToDelete) {
        return acc;
      }

      return { ...acc, [propKey]: value };
    },
    {} as Omit<T, K>,
  );

  return updatedObject;
}
