
export type DeepStringObj = { [key: string]: string | DeepStringObj }
export type StringObj = { [key: string]: string | undefined }

const buildKey = (base: string, curr: string) => base ? `${base}.${curr}` : curr;
export const flatObject = (object: DeepStringObj): StringObj => {
  const result: StringObj = {};

  const iterate = (item: DeepStringObj, currentKey: string) => {
    Object.keys(item).forEach((key) => {
      const value = item[key];
      if (typeof value === 'object') iterate(value, buildKey(currentKey, key));
      else result[buildKey(currentKey, key)] = value;
    });
  };

  iterate(object, '');

  return result;
};
