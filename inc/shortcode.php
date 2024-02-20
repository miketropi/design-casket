<?php 
/**
 * Shortcode
 */

function dc_design_casket_func( $atts ) {
  $atts = shortcode_atts([
    'classes' => '',
  ], $atts);

  ob_start();
  ?>
  <div id="DESIGN_CASKET_ROOT" class="<?php echo $atts['classes']; ?>">
    <!-- JS Render -->
  </div> <!-- #DESIGN_CASKET_ROOT -->
  <?php
  return ob_get_clean();
}

add_shortcode('design_casket', 'dc_design_casket_func');