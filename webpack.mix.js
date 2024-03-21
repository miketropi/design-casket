const mix = require('laravel-mix');

mix.extract(['react', 'react-dom', 'fabric'], 'design-casket-vendor.js');

mix
  .js('./src/main.js', 'dist/design-casket.bundle.js')
  .js('./src/admin.js', 'dist/design-casket.admin.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'css/design-casket.bundle.css')
  .options({ processCssUrls: false })
  .setPublicPath('dist')