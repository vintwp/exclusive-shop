export async function createMultipartFormData<
  T extends Record<string, unknown>,
>(data: T, files?: File[]) {
  const formData = new FormData();

  Object.keys(data).forEach((key: string) => {
    const value = data[key];

    formData.append(key, value as never);
  });

  files?.forEach((file: File) => {
    formData.append('files', file, file.name);
  });

  return formData;
}
