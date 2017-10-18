// This was shamelessly stolen from https://github.com/reactstrap/reactstrap/blob/master/rollup.config.js
// after spending several hours trying to implement something similar on my own.
// Thanks guys!

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import replace from 'rollup-plugin-replace';

// Require understands JSON files.
const packageJson = require('./package.json');

const peerDependencies = Object.keys(packageJson.peerDependencies);
const dependencies = Object.keys(packageJson.dependencies);

function baseConfig() {
    return {
        name: 'pupper-react',
        input: 'src/index.js',
        plugins: [
            nodeResolve(),
            commonjs(),
            babel({plugins: ['external-helpers']}),
        ],
        sourcemap: true,
    };
}

function baseUmdConfig(minified) {
    const config = Object.assign(baseConfig(), {
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'prop-types': 'PropTypes',
        },
        external: peerDependencies,
    });
    config.plugins.push(replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }));

    if (minified) {
        config.plugins.push(minify({comments: false}));
    }

    return config;
}

/*
  COMMONJS / MODULE CONFIG
  ------------------------
  Goal of this configuration is to generate bundles to be consumed by bundlers.
  This configuration is not minimized and will import all dependencies.
*/
const libConfig = baseConfig();
// Do not include any of the dependencies
libConfig.external = peerDependencies.concat(dependencies);
libConfig.output = [
    {file: 'dist/pupper-react.cjs.js', format: 'cjs'},
    {file: 'dist/pupper-react.es.js', format: 'es'},
];

/*
  UMD CONFIG
  ----------
  Goal of this configuration is to be directly included on web pages.
  This configuration is minimized and will include dependencies that are not
  marked as peer dependencies. ** See below
  Defining this config will also check that all peer dependencies are set up
  correctly in the globals entry.
  Reactstrap has two versions:
  1) `pupper-react.min.js`
  2) `pupper-react.full.min.js`
      This file includes all dependencies.
  For both versions the peer dependencies are always excluded and must be manually
  included - `react` and `react-dom`.
*/
const umdConfig = baseUmdConfig(false);

// Validate globals in main UMD config
const missingGlobals = peerDependencies.filter(dep => !(dep in umdConfig.globals));
if (missingGlobals.length) {
    console.error('All peer dependencies need to be mentioned in globals, please update rollup.config.js.');
    console.error('Missing: ' + missingGlobals.join(', '));
    console.error('Aborting build.');
    process.exit(1);
}

const external = umdConfig.external.slice();

const globals = Object.assign({}, umdConfig.globals);

umdConfig.external = external;
umdConfig.globals = globals;
umdConfig.output = [
    {file: 'dist/pupper-react.umd.js', format: 'umd'},
];

const umdConfigMin = baseUmdConfig(true);
umdConfigMin.external = external;
umdConfigMin.globals = globals;
umdConfigMin.output = [
    {file: 'dist/pupper-react.umd.min.js', format: 'umd'},
];


export default [
    libConfig,
    umdConfig,
    umdConfigMin,
];