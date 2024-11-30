export function createValuesFromMultiselect<
  T extends { value: string; label: string },
>(options: T[]) {
  const values = options.map(option => option.value);

  return values;
}
