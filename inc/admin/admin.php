<?php 
/**
 * Admin helper functions
 */

function dc_admin_ctp_design_casket_custom_columns() {

}

function dc_admin_design_casket_view_metabox_callback($post) {
  // print_r($post);
  $ID = $post->ID;
  echo do_shortcode('[design_casket edit_mode=0 design='. $ID .']');
} 