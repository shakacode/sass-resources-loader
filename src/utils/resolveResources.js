import path from 'path';

import fileExists from './fileExists';
import handleNoFileCase from './handleNoFileCase';
import createImport from './createImport';

export default function(resources, webpack) {
  const resourcesPath = path.resolve(webpack.options.context, resources);
  const noFile = (
    !fileExists(resourcesPath) &&
    !fileExists(resourcesPath + '.scss') &&
    !fileExists(resourcesPath + '.sass')
  );

  if (noFile) {
    return handleNoFileCase(resources, resourcesPath);
  }

  return createImport(resourcesPath, webpack);
}
