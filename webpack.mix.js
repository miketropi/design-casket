const mix = require('laravel-mix');

mix
  .js('./src/main.js', 'dist/design-casket.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'css/design-casket.bundle.css')
  .options({ processCssUrls: false })
  .setPublicPath('dist')