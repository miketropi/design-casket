<?php 
/**
 * Hooks 
 */

function dc_send_mail_admin_after_submission_successful ($submissionData, $postID) {
  $to = get_field('email_admin', 'option');
  $headers = array('Content-Type: text/html; charset=UTF-8');
  $message = "Hello,
Please click the link below to view the proposed coffin design.

<a href='http://develop.local/#designcasket_". $postID ."'>http://develop.local/#designcasket_". $postID ."</a>

Thank you.";
  wp_mail($to, 'Proposed Coffin Design', $message, $headers);
} 

add_action( 'DC:SAVE_SUBMISSION_SUCCESSFUL_HOOK', 'dc_send_mail_admin_after_submission_successful', 20, 2 );