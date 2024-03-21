<?php 
/**
 * Shortcode
 */

function dc_design_casket_func( $atts ) {
  $atts = shortcode_atts([
    'classes' => '',
    'edit_mode' => 1,
    'design' => '',
  ], $atts);

  ob_start();
  ?>
  <div 
    id="DESIGN_CASKET_ROOT" 
    class="<?php echo $atts['classes']; ?>" 
    data-design="<?php echo $atts['design'] ?>" 
    data-editmode="<?php echo $atts['edit_mode'] ?>">
    <!-- JS Render -->
  </div> <!-- #DESIGN_CASKET_ROOT -->
  <?php
  return ob_get_clean();
}

add_shortcode('design_casket', 'dc_design_casket_func');