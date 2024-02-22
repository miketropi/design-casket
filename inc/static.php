<?php 
/**
 * Static
 */

function dc_enqueue_scripts() {
  wp_enqueue_style('design-casket-css', DC_URI . '/dist/css/design-casket.bundle.css', false, DC_VERSION);
  wp_enqueue_script('design-casket-js', DC_URI . '/dist/design-casket.bundle.js', ['jquery'], DC_VERSION, true);

  wp_localize_script('design-casket-js', 'DC_PHP_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'settings' => [
      'image_collection' => dc_get_image_collection(),
    ],
    'lang' => []
  ]);
}

add_action('wp_enqueue_scripts', 'dc_enqueue_scripts');