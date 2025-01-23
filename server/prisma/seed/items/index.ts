import * as iphone from './electronics/mobile-phones/iphone';
import * as tv from './electronics/tv/tv';
import { TinitialItems } from './types';

const initialItems = [
  ...iphone.initialItems,
  ...tv.initialItems,
];

export default initialItems;