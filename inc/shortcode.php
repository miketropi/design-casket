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

  <div class="design_casket__share-modal">
    <div class="design_casket__share-modal-content">
      <span class="design_casket__share-modal-close" onClick="document.body.classList.remove('__show_design_casket__share-modal')">✕</span>
      <?php echo do_shortcode(get_field('share_content', 'option')); ?>
    </div>
  </div> <!-- .design_casket__share-modal -->
  <?php
  return ob_get_clean();
}

add_shortcode('design_casket', 'dc_design_casket_func');