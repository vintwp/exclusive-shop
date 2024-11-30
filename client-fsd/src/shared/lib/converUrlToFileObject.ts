export async function converUrlToFileObject(url: string) {
  const response = await fetch(url);
  const fileName = url.replace(/^.*[\\/]/, '');

  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });

  return file;
}
