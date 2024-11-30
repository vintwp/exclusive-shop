export function deleteProperties<T>(obj: T, keysToDelete: Array<keyof T>) {
  const objectKeys = Object.keys(obj) as Array<keyof T>;

  const modifiedObject = objectKeys.reduce((acc, key) => {
    if (keysToDelete.includes(key)) {
      return acc;
    }

    acc[key as string] = obj[key];

    return acc;

  }, {});

  return modifiedObject as Omit<T, keyof T>;
}

export function compareObjects(obj1: unknown, obj2: unknown) {
  if (!obj1 || !obj2) {
    return false;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key in Object.keys(obj1)) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

export function dateInISO() {
  const now = new Date();

  return now.toISOString();
}

export function convertIdToString<T extends { id: number }>(data: T | Array<T>) {
  if (Array.isArray(data)) {
    const d = data.map(item => {
      return {
        ...item,
        id: String(item.id)
      };
    });

    return d;
  }

  return {
    ...data,
    id: String(data.id)
  };
}

export function isTrueSet(value: string) {
  return value.toLowerCase() === 'true';
}

export function createUrl(name: string): string {
  const slug = name
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  return slug;
}
