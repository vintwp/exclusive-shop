/* eslint-disable @typescript-eslint/indent */
import { Option } from '../MultipleSelector';

export function createOptions<T, K extends keyof T, P extends keyof T>(
  data: T[],
  fieldAsValue: K, // would be value for list
  fieldAsLabel: P, // would be label for list
  disabledData?: Pick<T, K> | Pick<T, K>[],
): Option[] {
  if (data && disabledData) {
    const options = data.map(d => {
      const isDisabled = Array.isArray(disabledData)
        ? disabledData.find(disabledItem => {
            return disabledItem[fieldAsValue] === d[fieldAsValue];
          })
        : d[fieldAsValue] === disabledData[fieldAsValue];

      return {
        value: d[fieldAsValue],
        label: d[fieldAsLabel],
        disable: isDisabled,
      };
    }) as Option[];

    return options;
  }

  const options = data.map(d => {
    return {
      value: d[fieldAsValue],
      label: d[fieldAsLabel],
    };
  }) as Option[];

  return options;
}
