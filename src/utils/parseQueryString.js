export default function(queryString) {
  if (!queryString || queryString === '?') {
    return {};
  }
  
  return queryString
    .slice(1)
    .split('&')
    .reduce((prev, queryItem) => {
      const queryArr = queryItem.split('=');

      prev[queryArr[0]] = queryArr[1];

      return prev;
    }, {});
}
