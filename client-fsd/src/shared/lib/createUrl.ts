export function createUrl(str: string): string {
  const url = str
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  return url;
}
