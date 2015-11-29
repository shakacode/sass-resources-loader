import path from 'path';

export default function(module, webpack) {
  const modulePath = path.relative(webpack.context, module);
  const moduleSassPath = modulePath.replace(/\\/g, '/');
  webpack.addDependency(modulePath);
  return `@import "${moduleSassPath}";`;
}
