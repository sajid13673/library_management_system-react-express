export const validateEmail = (str) => {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
};
export const validateOnlyNumbers = (str) => {
  return /^[0-9]*$/.test(str);
};
export const validateAdderess = (str) => {
  return /^[A-Za-z0-9 /.,]*$/.test(str);
};
