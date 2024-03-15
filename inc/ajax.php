<?php 
/**
 * Ajax
 */

function dc_ajax_save_design() {
  // wp_send_json($_POST); return;
  $postID = $_POST['data']['postID'];
  $designJSON = $_POST['data']['designJSON'];
  $postID = dc_save_design($designJSON, $postID);
  wp_send_json([
    'success' => true,
    'message' => __('Saved design successfully!'),
    'PID' => $postID,
  ]);
}

add_action('wp_ajax_dc_ajax_save_design', 'dc_ajax_save_design');
add_action('wp_ajax_nopriv_dc_ajax_save_design', 'dc_ajax_save_design');

function dc_ajax_get_design_json_url() {
  $PID = $_POST['data']['postID'];
  $json_uri = dc_get_design_json_url($PID);

  wp_send_json([
    'success' => true,
    'design_data_url' => $json_uri,
  ]);
}

add_action( 'wp_ajax_dc_ajax_get_design_json_url', 'dc_ajax_get_design_json_url' );
add_action( 'wp_ajax_nopriv_dc_ajax_get_design_json_url', 'dc_ajax_get_design_json_url' );

function dc_ajax_save_submission() {
  $submissionData = $_POST['data']['submissionData'];
  $postID = dc_save_submission($submissionData);

  do_action('DC:SAVE_SUBMISSION_SUCCESSFUL_HOOK', $submissionData, $postID );

  wp_send_json([
    'success' => true,
    'submissionID' => $postID,
  ]);
}

add_action( 'wp_ajax_dc_ajax_save_submission', 'dc_ajax_save_submission' );
add_action( 'wp_ajax_nopriv_dc_ajax_save_submission', 'dc_ajax_save_submission' );

function dc_ajax_upload_image() {
  $res = dc_upload_image($_FILES['image_upload']);
  
  wp_send_json([
    'success' => true,
    'upload' => $res,
  ]);
}

add_action( 'wp_ajax_dc_ajax_upload_image', 'dc_ajax_upload_image' );
add_action( 'wp_ajax_nopriv_dc_ajax_upload_image', 'dc_ajax_upload_image' );