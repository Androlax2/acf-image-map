import { dest, parallel, series, src, watch } from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import cssvariables from 'postcss-css-variables';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import util from 'gulp-util';
import postcssGapProperties from 'postcss-gap-properties';

const sass = gulpSass(nodeSass);

const config = {
    production: !!util.env.production,
};

/**
 * Task for stylesheet
 */
export const styles = () => {
    return src(['assets/scss/field.scss'])
        .pipe(!config.production ? sourcemaps.init() : util.noop())
        .pipe(
            sass({
                outputStyle: !config.production ? 'expanded' : 'compressed',
            }).on('error', sass.logError)
        )
        .pipe(
            postcss([
                nested,
                cssvariables({
                    preserve: true,
                }),
                autoprefixer({
                    cascade: false,
                    grid: 'autoplace',
                }),
                postcssGapProperties(),
            ])
        )
        .pipe(!config.production ? sourcemaps.write() : util.noop())
        .pipe(dest('dist/css'));
};

/**
 * Task for scripts
 */
export const scripts = () => {
    return src(['assets/js/field.js'])
        .pipe(named())
        .pipe(
            webpack({
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env'],
                                },
                            },
                        },
                    ],
                },
                mode: !config.production ? 'development' : 'production',
                devtool: !config.production ? 'inline-source-map' : false,
                output: {
                    filename: '[name].js',
                },
            })
        )
        .pipe(dest('dist/js'));
};

/**
 * Task to copy each files coming into the src directory
 */
export const copy = () => {
    return src(['assets/**/*', '!assets/{images,js,scss}', '!assets/{images,js,scss}/**/*']).pipe(dest('dist'));
};

/**
 * Task to clean the dist folder
 */
export const clean = () => del(['dist']);

/**
 * Watch for changes and start the task needed
 */
export const watchForChanges = () => {
    watch('assets/scss/**/*.scss', series(styles));
    watch(['assets/**/*', '!assets/{images,js,scss}', '!assets/{images,js,scss}/**/*'], series(copy));
    watch('assets/js/**/*.js', series(scripts));
};

/**
 * Commands
 */
export const dev = series(clean, parallel(styles, copy, scripts), watchForChanges);
export const build = series(clean, parallel(styles, scripts, copy));
export default dev;
