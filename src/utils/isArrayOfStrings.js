export default array => (
  Array.isArray(array) && array.every(item => typeof item === 'string')
);
