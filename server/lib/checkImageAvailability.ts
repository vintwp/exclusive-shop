import path from 'path';
import { existsSync } from 'fs';

// if image not avaiable on server - add no-image

export function checkImageAvailability(url: string | string[]): string[] {
  const noImageFileName = 'no-image.png';
  const resultImages: string[] = [];

  const isImageExists = (imgUrl: string) => {
    const urlToFile = path.resolve(__dirname, '..', 'static', `${imgUrl}`);

    return existsSync(urlToFile);
  };

  if (Array.isArray(url)) {

    const checkedImages = url.map(imgUrl => {
      const isImageAvaiable = isImageExists(imgUrl);

      if (!isImageAvaiable) {
        return noImageFileName;
      }

      return imgUrl;
    });
    
    if (checkedImages.every(val => val === noImageFileName)) {
      resultImages.push(noImageFileName);

      return resultImages;
    }

    if (checkedImages.some(val => val === noImageFileName)) {
      const filteredWoNoImage = checkedImages.filter(val => val !== noImageFileName);

      resultImages.push(...filteredWoNoImage);

      return resultImages;
    }

    resultImages.push(...url);

    return resultImages;

  }

  const isImageAvaiable = isImageExists(url as string);

  resultImages.push(isImageAvaiable ? url as string : noImageFileName);

  return resultImages;
  
}