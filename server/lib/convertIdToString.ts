interface RecursiveObject {
  [key: string]: Trimmable;
}

type Trimmable = string | object | number | RecursiveObject[];

export function convertIdToString<T = Trimmable>(data: Trimmable): T {
  if (
    typeof data === "string"
    || typeof data === "number"
    || typeof data === "boolean"
    || typeof data === 'object' && data instanceof Date
  ) {
    return data as T;
  } 
  if (Array.isArray(data)) {
    return data.map((item) => convertIdToString<RecursiveObject>(item)) as unknown as T;
  } 
  if (typeof data === "object" && data !== null) {
    const result: RecursiveObject = {};

    Object.keys(data).forEach((key) => {
        if (key.toLowerCase().includes('id')) {
            const value = data[key as keyof typeof data] as number;
            result[key] = convertIdToString<Trimmable>(value.toString())
            return;
        }
        result[key] = convertIdToString<Trimmable>(data[key as keyof typeof data]);
    });
    return result as unknown as T;
  } 
    return undefined as T;
}