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

function dc_save_design($data, $postID = '') {
  $meta_field_name = '__DESIGN_CASKET_JSON';

  if($postID) {
    // update
    $path = dc_save_design_json_to_file(json_encode($data, JSON_NUMERIC_CHECK), $postID);
    update_post_meta($postID, '__DESIGN_CASKET_JSON_PATH', $path);
    return $postID; 
  }

  // create
  $title = sprintf('Created at %s', current_time('mysql'));
  $newPostID = wp_insert_post([
    'post_title' => $title,
    'post_type' => 'design-casket', 
    'post_status' => 'publish',
  ]);
  
  $path = dc_save_design_json_to_file(json_encode($data, JSON_NUMERIC_CHECK), $newPostID);
  update_post_meta($newPostID, '__DESIGN_CASKET_JSON_PATH', $path);
  return $newPostID;
}

function dc_save_design_json_to_file($jsonCODE, $postID = '') {
  $upload_dir = wp_upload_dir();
  $path_filename = $upload_dir['basedir'] . "/" . DC_DESIGN_CASKET_JSON_FOLDER;
  $current_time = current_time('mysql'); 

  if (!file_exists($path_filename)) {
    // create directory/folder uploads.
    mkdir($path_filename, 0777, true);
  }
  
  $path = $path_filename . '/'. sprintf('%s.json', $postID);
  file_put_contents($path, $jsonCODE);
  // file_put_contents($path, $jsonCODE, FILE_APPEND);
  return $path;
}

function dc_get_design_json_url($postID) {
  $path = get_post_meta( $postID, '__DESIGN_CASKET_JSON_PATH', true );

  if(empty($path)) {
    return '';
  }

  $segments = explode('/', $path);
  return get_site_url() . '/wp-content/uploads/' . DC_DESIGN_CASKET_JSON_FOLDER . '/' . end($segments);
}