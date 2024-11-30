<?php 
/**
 * Hooks 
 */

function dc_send_mail_admin_after_submission_successful ($submissionData, $postID) {
  $to = get_field('email_admin', 'option');
  $root_site = get_field('root_url_sharing', 'option');
  $headers = ['Content-Type: text/html; charset=UTF-8'];
  $url_design = $root_site . "/#designcasket_" . $postID;
  ob_start();
  ?>
  <strong>Hello,</strong> 
  <p>Please click the link below to view the proposed coffin design.</p>
  <a href='<?php echo $url_design; ?>'><?php echo $url_design; ?></a>
  <p>Thank you.</p>  
  <?php
  $message = ob_get_contents();
  wp_mail($to, 'Proposed Coffin Design', $message, $headers);
} 

add_action( 'DC:SAVE_SUBMISSION_SUCCESSFUL_HOOK', 'dc_send_mail_admin_after_submission_successful', 20, 2 );