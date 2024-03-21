<?php 
/**
 * Admin hooks
 */

function dc_admin_ctp_design_casket_view_metabox() {
	$screens = [ 'design-casket' ];
	foreach ( $screens as $screen ) {
		add_meta_box(
			'design_casket_view',            
			'Design Casket View',  
			'dc_admin_design_casket_view_metabox_callback', 
			$screen 
		);
	}
}

add_action( 'add_meta_boxes', 'dc_admin_ctp_design_casket_view_metabox' );