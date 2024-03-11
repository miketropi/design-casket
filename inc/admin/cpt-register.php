<?php 
/**
 * CPT Register
 */

/**
 *
 */
function dc_admin_design_casket_cpt() {
  $icon = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDIwMi4xMTEgMjAyLjExMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMjYuMTI5LDE1My4xNDhjMi45MjksMi45MjksMi45MjksNy42NzgsMCwxMC42MDZsLTYuNTg1LDYuNTg2Yy0xLjQwNywxLjQwNy0zLjMxNCwyLjE5Ny01LjMwNCwyLjE5Nw0KCWMtMC4wMTMsMC0wLjAyNi0wLjAwMi0wLjAzOS0wLjAwMmMtMC4wMTMsMC0wLjAyNiwwLjAwMi0wLjAzOCwwLjAwMmMtMi4zODIsMC00LjUwMS0xLjExNC01Ljg3NS0yLjg0NmwtNi4wOTItNi4wOTMNCgljLTIuOTI5LTIuOTI5LTIuOTI4LTcuNjc4LDAtMTAuNjA2YzEuMjUxLTEuMjUxLDIuODM1LTEuOTYyLDQuNDY2LTIuMTQ1VjIyLjU3Yy0xLjYzMi0wLjE4Mi0zLjIxNS0wLjg5NC00LjQ2Ny0yLjE0Ng0KCWMtMi45MjktMi45MjktMi45MjgtNy42NzgsMC0xMC42MDZsNi41ODUtNi41ODVjMS40NzMtMS40NzMsMy40MDctMi4yMDMsNS4zMzgtMi4xOTRjMC4wMTQsMCwwLjAyOC0wLjAwMiwwLjA0My0wLjAwMg0KCWMyLjM4MSwwLDQuNDk5LDEuMTEzLDUuODczLDIuODQ0bDYuMDkzLDYuMDkzYzIuOTI5LDIuOTI5LDIuOTI5LDcuNjc4LDAsMTAuNjA2Yy0xLjI1MSwxLjI1MS0yLjgzNSwxLjk2NC00LjQ2NywyLjE0NnYxMjguMjc4DQoJQzIzLjI5NCwxNTEuMTg1LDI0Ljg3OCwxNTEuODk3LDI2LjEyOSwxNTMuMTQ4eiBNMjAyLjExMSwxODYuODM0YzAtMS45ODktMC43OS0zLjg5Ny0yLjE5Ny01LjMwNGwtNi41ODUtNi41ODUNCgljLTIuOTMtMi45MjgtNy42NzctMi45MjktMTAuNjA3LDAuMDAxYy0xLjI1MSwxLjI1MS0xLjk2MywyLjgzNC0yLjE0NSw0LjQ2Nkg1Mi4yOTljLTAuMTgyLTEuNjMyLTAuODk0LTMuMjE1LTIuMTQ2LTQuNDY3DQoJYy0yLjkyOS0yLjkyOC03LjY3OC0yLjkyOC0xMC42MDYsMGwtNi4wOTUsNi4wOTVjLTEuNzI5LDEuMzc0LTIuODQyLDMuNDkxLTIuODQyLDUuODcyYzAsMC4wMTMsMC4wMDIsMC4wMjUsMC4wMDIsMC4wMzgNCgljMCwwLjAxMy0wLjAwMiwwLjAyNi0wLjAwMiwwLjAzOWMwLDEuOTg5LDAuNzksMy44OTcsMi4xOTcsNS4zMDRsNi41ODUsNi41ODVjMS40NjUsMS40NjQsMy4zODQsMi4xOTYsNS4zMDMsMi4xOTYNCglzMy44MzktMC43MzIsNS4zMDQtMi4xOTdjMS4yNTEtMS4yNTEsMS45NjItMi44MzQsMi4xNDUtNC40NjVoMTI4LjI3OGMwLjE4MiwxLjYzMSwwLjg5NCwzLjIxNSwyLjE0NSw0LjQ2Ng0KCWMxLjQ2NCwxLjQ2NCwzLjM4NCwyLjE5Niw1LjMwMywyLjE5NnMzLjgzOS0wLjczMiw1LjMwMy0yLjE5Nmw2LjA5MS02LjA5MWMxLjczMi0xLjM3NCwyLjg0Ni0zLjQ5MiwyLjg0Ni01Ljg3NQ0KCWMwLTAuMDEzLTAuMDAyLTAuMDI2LTAuMDAyLTAuMDM5QzIwMi4xMDksMTg2Ljg2LDIwMi4xMTEsMTg2Ljg0NywyMDIuMTExLDE4Ni44MzR6IE0xOTQuNjExLDY0LjI4NWgtNTIuNzY3VjguNTM2DQoJYzAtNC4xNDMtMy4zNTgtNy41LTcuNS03LjVINDQuODUxYy00LjE0MiwwLTcuNSwzLjM1Ny03LjUsNy41djE0Ny43MzJjMCw0LjE0MywzLjM1OCw3LjUsNy41LDcuNWgxNDkuNzZjNC4xNDIsMCw3LjUtMy4zNTcsNy41LTcuNQ0KCVY3MS43ODVDMjAyLjExMSw2Ny42NDMsMTk4Ljc1Myw2NC4yODUsMTk0LjYxMSw2NC4yODV6Ii8+DQo8L3N2Zz4=';

	$args = [
    'label'              => __( 'Design Casket', 'dc' ),
		'public'             => false,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => [ 'slug' => 'design-casket' ],
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => [ 'title', 'thumbnail' ],
    'menu_icon'          => 'data:image/svg+xml;base64,' . $icon,
  ];

	register_post_type( 'design-casket', $args );
}

add_action( 'init', 'dc_admin_design_casket_cpt', 20 );

function dc_admin_design_casket_submission_ctp() {
	$args = [
    'label'              => __( 'Submission', 'dc' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => 'edit.php?post_type=design-casket',
		'query_var'          => true,
		'rewrite'            => [ 'slug' => 'dc-submission' ],
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		// 'menu_position'      => null,
		'supports'           => [ 'title' ],
  ];

	register_post_type( 'dc-submission', $args );
}

add_action( 'init', 'dc_admin_design_casket_submission_ctp', 30 );