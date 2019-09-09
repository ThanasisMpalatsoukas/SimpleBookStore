const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
   .js('resources/js/index.js','public/js')
   .react('resources/js/review.js','public/js')
   .react('resources/js/admin/index.js','public/js/admin')
   .sass('resources/sass/admin.scss','public/css')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/index.scss','public/index');
