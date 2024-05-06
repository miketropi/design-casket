<?php 
/**
 * Static
 */

function dc_enqueue_scripts() {
  wp_enqueue_style('design-casket-css', DC_URI . '/dist/css/design-casket.bundle.css', false, DC_VERSION);
  wp_enqueue_script('design-casket-manifest-js', DC_URI . '/dist/manifest.js', false, DC_VERSION, true);
  wp_enqueue_script('design-casket-vendor-js', DC_URI . '/dist/design-casket-vendor.js', false, DC_VERSION, true);
  wp_enqueue_script('design-casket-js', DC_URI . '/dist/design-casket.bundle.js', ['jquery'], DC_VERSION, true);

  wp_localize_script('design-casket-js', 'DC_PHP_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'), 
    'settings' => [
      'enable_image_collection' => get_field('enable_image_collection', 'option'),
      'image_collection' => dc_get_image_collection(),
      'instructions_content' => get_field('instructions_content', 'option'),
      'root_url_sharing' => get_field('root_url_sharing', 'option'),
      'share_content' => get_field('share_content', 'option'),
    ],
    'lang' => [],
    '_COOKIE' => $_COOKIE,
  ]);
}

add_action('wp_enqueue_scripts', 'dc_enqueue_scripts');

function dc_admin_enqueue_scripts() {
  wp_enqueue_style('design-casket-admin-css', DC_URI . '/dist/css/design-casket.bundle.css', false, DC_VERSION);
  wp_enqueue_script('design-casket-manifest-admin-js', DC_URI . '/dist/manifest.js', false, DC_VERSION, true);
  wp_enqueue_script('design-casket-vendor-admin-js', DC_URI . '/dist/design-casket-vendor.js', false, DC_VERSION, true);
  wp_enqueue_script('design-casket-admin-js', DC_URI . '/dist/design-casket.admin.bundle.js', ['jquery'], DC_VERSION, true);

  wp_localize_script('design-casket-admin-js', 'DC_PHP_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),  
    'settings' => [
      'enable_image_collection' => get_field('enable_image_collection', 'option'),
      'image_collection' => dc_get_image_collection(),
      'instructions_content' => get_field('instructions_content', 'option'),
      'root_url_sharing' => get_field('root_url_sharing', 'option'),
      'share_content' => get_field('share_content', 'option'),
    ], 
    'lang' => [],
    '_COOKIE' => $_COOKIE,
  ]);
}

add_action('admin_enqueue_scripts', 'dc_admin_enqueue_scripts'); 