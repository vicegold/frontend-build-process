/*jshint esversion: 6 */

let mix = require('laravel-mix');
// var LiveReloadPlugin = require('webpack-livereload-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

console.log('svg');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('src/js/app.js', 'dist/')
   .sass('src/css/app.scss', 'dist/')
   .setPublicPath('dist')
   // .copyDirectory('src/images', 'dist/images')
   .browserSync({
     proxy: 'mix.ld',
     files: [
       '*.+(html|php)',
       'dist/**/*.css',
       'dist/images/**/*.+(jpeg|jpg|png|gif|svg|js)',
       'dist/**/*.js'
     ]
   })
   // .svgSprite('src/icons/**/*.svg', 'dist/sprite.svg')
   .disableNotifications();

mix.webpackConfig({
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/images/', to: 'images' },
      { from: 'src/fonts', to: 'fonts' }
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        })
      ]
    }),
    new SVGSpritemapPlugin({
      src:'pommes/svg/*.svg',
      filename: '/images/svg/icons.svg',
      styles: 'assets/sprites.css',
      prefix: 'test-',
      svg4everybody: true,
      svgo: {
        removeTitle: false,
        removeStyleElement: false,
        cleanupNumericValue: false,
      }
    })
  ]
});

// // Adapt laravel-mix webpack config to better handle svg images.
// Mix.listen('configReady', (webpackConfig) => {
//
//     // Add separate svg loader
//     webpackConfig.module.rules.push({
//         test: /\.(svg)$/,
//         include: /assets\/svg/,
//         loaders: [
//             {
//                 loader: 'file-loader',
//                 options: {
//                     name: 'svg/[name].[ext]?[hash]',
//                     publicPath: Config.resourceRoot
//                 }
//             },
//
//             {
//                 loader: 'img-loader',
//                 options: Config.imgLoaderOptions
//             }
//         ]
//     });
//
//     // Exclude local 'svg' folder from font loader
//     let fontLoaderConfig = webpackConfig.module.rules.find(rule => String(rule.test) === String(/\.(woff2?|ttf|eot|svg|otf)$/));
//     fontLoaderConfig.exclude = /(assets\/svg)/;
//
// });
