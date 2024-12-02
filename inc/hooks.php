<?php 
/**
 * Hooks 
 */

function dc_send_mail_admin_after_submission_successful ($submissionData, $postID) {
  $to = get_field('email_admin', 'option');
  $root_site = get_field('root_url_sharing', 'option');
  $headers = ['Content-Type: text/html; charset=UTF-8'];

  $postDesignID = get_field('design', $postID);
  $url_design = $root_site . "/#designcasket_" . $postDesignID;
  
  // $url_design = get_edit_post_link($postID);

  ob_start();
  ?>
  <?php print_r($postDesign) ?>
  <strong>Hello,</strong> 
  <p>Please click the link below to view the proposed coffin design.</p>
  <a href='<?php echo $url_design; ?>'><?php echo $url_design; ?></a>
  <p>Thank you.</p>  
  <?php
  $message = ob_get_clean();

  wp_mail($to, 'Proposed Coffin Design', $message, $headers);
} 

add_action( 'DC:SAVE_SUBMISSION_SUCCESSFUL_HOOK', 'dc_send_mail_admin_after_submission_successful', 20, 2 );

function dc_modal_design_mode() {
  $modal_mode = get_field('dc_modal_design_mode', 'option');
  if($modal_mode != true) return;
  ?>
  <div class="dc-modal-design">
    <div class="dc-modal-design__inner">
      <div class="dc-modal-design__head">
        <span 
          class="dc-modal-design__close" 
          title="close"
          onclick="javascript: document.body.classList.remove('dc-modal-design__open')">✕</span>
      </div>
      <div class="dc-modal-design__body">
        <?php echo do_shortcode( '[design_casket]' ) ?>
      </div>
    </div>
  </div>
  <script>
    ((w) => {
      'use strict';

      const modalModeHandle = () => {
        let design_casket = document.querySelectorAll('#DESIGN_CASKET_ROOT');
        let length = design_casket.length;

        if(length != 1) return;
        if(!window.location.hash) return;

        const [prefix, id] = window.location.hash.split('_');
        
        if(prefix == '#designcasket') {
          document.body.classList.add('dc-modal-design__open')
        }
      }

      w.addEventListener('load', function() {
        modalModeHandle();

        document.querySelector('a.dc-modal-design-trigger, li.dc-modal-design-trigger a').addEventListener('click', function(e) {
          e.preventDefault();
          document.body.classList.add('dc-modal-design__open')
        })
      })

    })(window)
  </script>
  <?php
}

add_action( 'wp_footer', 'dc_modal_design_mode' );