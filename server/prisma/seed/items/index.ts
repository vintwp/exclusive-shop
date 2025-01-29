import * as iphone from './electronics/mobile-phones/iphone';
import * as tv from './electronics/tv/tv';
import * as laptop from './electronics/laptop/laptop'
import { TinitialItems } from './types';

const initialItems = [
  ...iphone.initialItems,
  ...tv.initialItems,
  ...laptop.initialItems,
];

export default initialItems;