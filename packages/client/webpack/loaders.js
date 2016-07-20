exports.tslint = {
  test: /\.tsx?$/,
  loader: 'tslint',
  exclude: /node_modules/,
};

exports.tsx = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  exclude: /node_modules/,
};

exports.istanbulInstrumenter = {
  test: /^(.(?!\.test))*\.tsx?$/,
  loader: 'istanbul-instrumenter-loader',
  query: {
    embedSource: true,
  },
};

exports.json = {
  test: /\.json$/,
  loader: 'json',
};
