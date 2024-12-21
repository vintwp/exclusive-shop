export function deleteProperties<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keysToDelete: K[]
): {
  [P in Exclude<keyof T, K>]: T[P]
} {
  const res = {} as T;

  for (const prop in obj) {
    const key = prop as keyof T

    if (!keysToDelete.includes(key as K)) {
      res[prop] = obj[prop];
    }
  };

  return res;
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
