import loaderUtils from 'loader-utils';

export default (context) => {
  const {
    resources = undefined,
    hoistUseStatements = false,
    ...rest
  } = loaderUtils.getOptions(context) || {};

  return {
    resources,
    hoistUseStatements,
    ...rest,
  };
};
