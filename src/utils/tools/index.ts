export const getParams: any = (search, keys) => {
  const result = {};
  const parmas = new URLSearchParams(search);
  keys.forEach((key) => {
    result[key] = parmas.get(key);
  });
  return result;
};

export const checkIslogIn: any = () => {
  return true;
};
