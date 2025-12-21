// src/utils/importImages.ts
export const importAllImages = (r: __WebpackModuleApi.RequireContext) => {
  const images: Record<string, string> = {};
  r.keys().forEach((key) => {
    const fileName = key.replace('./', ''); // remove './' from './Presda.jpg'
    images[fileName] = r(key).default;     // r(key) gives module object, .default is the actual URL
  });
  return images;
};
