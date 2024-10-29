import loaderUtils from 'loader-utils';

export default (context) => {
  const {
    resources = undefined,
    hoistUseStatements = false,
    ...rest
  } = context.getOptions() || {};

  return {
    resources,
    hoistUseStatements,
    ...rest,
  };
};
