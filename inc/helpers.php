<?php 
/**
 * Helpers
 */

function dc_load_template($name, $require_once = false) {
  load_template( DC_DIR . '/templates/' . $name . '.php', $require_once );
}

function dc_get_image_collection() {
  $images = get_field('image_collection', 'option');
  return $images ? array_map(function($c) {
    return [
      'thumbnail' => $c['sizes']['thumbnail'],
      'image' => $c['url']
    ];
  }, $images) : [];
}
