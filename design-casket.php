<?php 
/**
 * Plugin Name: Design Casket
 * Plugin URI: #
 * Description: Design your own casket
 * Author: Beplus
 * Author URI: #
 * Version: 1.0.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

{
  /**
   * Define
   */
  define('DC_VERSION', rand(0,999999999));
  define('DC_URI', plugin_dir_url(__FILE__));
  define('DC_DIR', plugin_dir_path(__FILE__));
}

{
  /**
   * Inc
   */
  require(DC_DIR . '/inc/static.php');
  require(DC_DIR . '/inc/hooks.php');
  require(DC_DIR . '/inc/helpers.php');
  require(DC_DIR . '/inc/ajax.php');
  require(DC_DIR . '/inc/template-tags.php');
  require(DC_DIR . '/inc/shortcode.php');
}

{
  /**
   * Boot
   */
}