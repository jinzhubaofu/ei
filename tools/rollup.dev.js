/**
 * @file rollup configuration for dev
 * @author leon <ludafa@outlook.com>
 */

import path from 'path';
import babel from 'rollup-plugin-babel';
import pkg from '../package.json';

export default {
    input: path.join(__dirname, '../src/index.js'),
    output: {
        file: 'lib/ei.js',
        format: 'umd',
        name: 'ei',
        amd: {
            id: 'ei'
        }
    },
    banner: `/* ei@${pkg.version} */`,
    sourcemap: true,
    globals: {
        'react': 'React',
        'prop-types': 'PropTypes',
        'react-redux': 'reactRedux',
        'redux': 'redux'
    },
    external: [
        'react',
        'redux',
        'react-redux',
        'prop-types'
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
