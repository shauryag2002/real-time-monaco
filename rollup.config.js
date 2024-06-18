import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
export default [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            }
        ],
        plugins: [
            copy({
                targets: [
                    { src: 'src/styles.css', dest: 'dist' }
                ]
            }),
            postcss({
                plugins: [],
                minimize: true,
            }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react']
            }),
            external(),
            resolve(),
            terser(),
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    }
];