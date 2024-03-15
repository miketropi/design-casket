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

function dc_create_user($userInfo) {

}

function dc_save_submission($formData) {
  $fullName = $formData['firstname'] . ' ' . $formData['lastname']; 
  $designID = $formData['design'];
  $title = sprintf('Submission %s | Design ID: %s | By: %s', current_time('mysql'), $designID, $fullName);
  $newPostID = wp_insert_post([
    'post_title' => $title,
    'post_type' => 'dc-submission', 
    'post_status' => 'publish', 
  ]);

  $metaFields = ['firstname', 'lastname', 'email', 'phone', 'address', 'city', 'postcode', 'design'];
  foreach($metaFields as $_index => $_f_name) {
    update_post_meta($newPostID, $_f_name, (isset($formData[$_f_name]) ? $formData[$_f_name] : ''));
  }

  return $newPostID;
}

function dc_upload_image($file) {
  if ( ! function_exists( 'wp_handle_upload' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
  }

  $upload_overrides = array( 'test_form' => false );
  $uploadedfile = $file;

  $movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
  return $movefile;
}