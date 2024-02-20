<?php 
/**
 * Helpers
 */

function dc_load_template($name, $require_once = false) {
  load_template( DC_DIR . '/templates/' . $name . '.php', $require_once );
}