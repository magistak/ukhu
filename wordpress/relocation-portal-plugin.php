<?php
/**
 * Plugin Name: Relocation Portal Content Manager
 * Plugin URI: https://your-domain.com
 * Description: Custom post types and taxonomies for dual-portal relocation system (Hungarian HU→UK and English →HU portals)
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: relocation-portal
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('RELOCATION_PORTAL_VERSION', '1.0.0');
define('RELOCATION_PORTAL_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RELOCATION_PORTAL_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Plugin activation hook
 */
function relocation_portal_activate() {
    // Register post types and taxonomies
    register_relocation_post_types();
    register_relocation_taxonomies();
    create_default_taxonomy_terms();
    
    // Flush rewrite rules
    flush_rewrite_rules();
    
    // Create initial content notice
    add_option('relocation_portal_show_welcome_notice', true);
}
register_activation_hook(__FILE__, 'relocation_portal_activate');

/**
 * Plugin deactivation hook
 */
function relocation_portal_deactivate() {
    // Flush rewrite rules
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'relocation_portal_deactivate');

// Include the main functions
require_once RELOCATION_PORTAL_PLUGIN_DIR . 'includes/post-types.php';
require_once RELOCATION_PORTAL_PLUGIN_DIR . 'includes/taxonomies.php';
require_once RELOCATION_PORTAL_PLUGIN_DIR . 'includes/rest-api.php';
require_once RELOCATION_PORTAL_PLUGIN_DIR . 'includes/admin.php';

/**
 * Show welcome notice after activation
 */
function relocation_portal_welcome_notice() {
    if (get_option('relocation_portal_show_welcome_notice')) {
        ?>
        <div class="notice notice-success is-dismissible">
            <h3>Relocation Portal Content Manager Activated!</h3>
            <p>Your dual-portal content system is now ready. Here's what to do next:</p>
            <ol>
                <li><strong>Install ACF Plugin:</strong> Install and activate Advanced Custom Fields plugin</li>
                <li><strong>Import Field Groups:</strong> Go to Custom Fields > Tools and import the ACF fields</li>
                <li><strong>Create Content:</strong> Start creating guides for both portals</li>
                <li><strong>Check API:</strong> Test the REST API endpoints at <code>/wp-json/wp/v2/guides</code></li>
            </ol>
            <p>
                <strong>Content Creation Rules:</strong><br>
                • <strong>Hungarian Site:</strong> Use audience "hu-to-uk" + locale "hu" for Hungarians moving to UK<br>
                • <strong>English Site:</strong> Use audience "to-hungary" + locale "en" for anyone moving to Hungary
            </p>
            <p>
                <a href="<?php echo admin_url('edit.php?post_type=guides'); ?>" class="button button-primary">Create Your First Guide</a>
                <a href="<?php echo admin_url('edit-tags.php?taxonomy=audience'); ?>" class="button">Manage Audiences</a>
            </p>
        </div>
        <?php
        delete_option('relocation_portal_show_welcome_notice');
    }
}
add_action('admin_notices', 'relocation_portal_welcome_notice');

/**
 * Add settings page
 */
function relocation_portal_admin_menu() {
    add_options_page(
        'Relocation Portal Settings',
        'Relocation Portal',
        'manage_options',
        'relocation-portal-settings',
        'relocation_portal_settings_page'
    );
}
add_action('admin_menu', 'relocation_portal_admin_menu');

/**
 * Settings page content
 */
function relocation_portal_settings_page() {
    ?>
    <div class="wrap">
        <h1>Relocation Portal Settings</h1>
        
        <div class="card">
            <h2>Content Statistics</h2>
            <table class="widefat">
                <tbody>
                    <tr>
                        <td><strong>Total Guides:</strong></td>
                        <td><?php echo wp_count_posts('guides')->publish; ?></td>
                    </tr>
                    <tr>
                        <td><strong>Hungarian Site Guides (hu-to-uk):</strong></td>
                        <td><?php 
                            $hu_guides = get_posts(array(
                                'post_type' => 'guides',
                                'post_status' => 'publish',
                                'numberposts' => -1,
                                'tax_query' => array(
                                    array(
                                        'taxonomy' => 'audience',
                                        'field' => 'slug',
                                        'terms' => 'hu-to-uk'
                                    )
                                )
                            ));
                            echo count($hu_guides);
                        ?></td>
                    </tr>
                    <tr>
                        <td><strong>English Site Guides (to-hungary):</strong></td>
                        <td><?php 
                            $en_guides = get_posts(array(
                                'post_type' => 'guides',
                                'post_status' => 'publish',
                                'numberposts' => -1,
                                'tax_query' => array(
                                    array(
                                        'taxonomy' => 'audience',
                                        'field' => 'slug',
                                        'terms' => 'to-hungary'
                                    )
                                )
                            ));
                            echo count($en_guides);
                        ?></td>
                    </tr>
                    <tr>
                        <td><strong>Total FAQs:</strong></td>
                        <td><?php echo wp_count_posts('faqs')->publish; ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="card">
            <h2>API Endpoints</h2>
            <p>Test these endpoints to verify your setup:</p>
            <ul>
                <li><strong>All Guides:</strong> <code><?php echo home_url('/wp-json/wp/v2/guides'); ?></code></li>
                <li><strong>Hungarian Site:</strong> <code><?php echo home_url('/wp-json/wp/v2/guides?audience=hu-to-uk'); ?></code></li>
                <li><strong>English Site:</strong> <code><?php echo home_url('/wp-json/wp/v2/guides?audience=to-hungary'); ?></code></li>
                <li><strong>All FAQs:</strong> <code><?php echo home_url('/wp-json/wp/v2/faqs'); ?></code></li>
            </ul>
        </div>
        
        <div class="card">
            <h2>Content Creation Quick Links</h2>
            <p>
                <a href="<?php echo admin_url('post-new.php?post_type=guides'); ?>" class="button button-primary">Add New Guide</a>
                <a href="<?php echo admin_url('post-new.php?post_type=faqs'); ?>" class="button">Add New FAQ</a>
                <a href="<?php echo admin_url('edit-tags.php?taxonomy=audience'); ?>" class="button">Manage Audiences</a>
                <a href="<?php echo admin_url('edit-tags.php?taxonomy=topic'); ?>" class="button">Manage Topics</a>
            </p>
        </div>
    </div>
    <?php
}

/**
 * Check for required plugins
 */
function relocation_portal_check_dependencies() {
    $missing_plugins = array();
    
    // Check for ACF
    if (!function_exists('acf_add_local_field_group')) {
        $missing_plugins[] = 'Advanced Custom Fields';
    }
    
    if (!empty($missing_plugins)) {
        ?>
        <div class="notice notice-warning">
            <p><strong>Relocation Portal:</strong> The following plugins are recommended for full functionality:</p>
            <ul>
                <?php foreach ($missing_plugins as $plugin): ?>
                    <li><?php echo esc_html($plugin); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php
    }
}
add_action('admin_notices', 'relocation_portal_check_dependencies');

/**
 * Add bulk actions for setting audience
 */
function relocation_portal_bulk_actions($bulk_actions) {
    $bulk_actions['set_audience_hu_to_uk'] = 'Set Audience: Hungarians to UK';
    $bulk_actions['set_audience_to_hungary'] = 'Set Audience: To Hungary';
    return $bulk_actions;
}
add_filter('bulk_actions-edit-guides', 'relocation_portal_bulk_actions');

/**
 * Handle bulk actions
 */
function relocation_portal_handle_bulk_actions($redirect_to, $doaction, $post_ids) {
    if ($doaction === 'set_audience_hu_to_uk') {
        foreach ($post_ids as $post_id) {
            wp_set_post_terms($post_id, 'hu-to-uk', 'audience', false);
        }
        $redirect_to = add_query_arg('bulk_audience_updated', count($post_ids), $redirect_to);
    }
    
    if ($doaction === 'set_audience_to_hungary') {
        foreach ($post_ids as $post_id) {
            wp_set_post_terms($post_id, 'to-hungary', 'audience', false);
        }
        $redirect_to = add_query_arg('bulk_audience_updated', count($post_ids), $redirect_to);
    }
    
    return $redirect_to;
}
add_filter('handle_bulk_actions-edit-guides', 'relocation_portal_handle_bulk_actions', 10, 3);

/**
 * Show bulk action success message
 */
function relocation_portal_bulk_action_notices() {
    if (!empty($_REQUEST['bulk_audience_updated'])) {
        $count = intval($_REQUEST['bulk_audience_updated']);
        printf('<div id="message" class="updated fade"><p>%s</p></div>', 
            sprintf(_n('%s guide audience updated.', '%s guides audience updated.', $count), $count)
        );
    }
}
add_action('admin_notices', 'relocation_portal_bulk_action_notices');