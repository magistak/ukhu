<?php
/**
 * Plugin Name: Relocation Portal Content Manager  
 * Plugin URI: https://your-domain.com
 * Description: Complete WordPress implementation for dual-portal relocation system (Hungarian HU→UK and English →HU portals)
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

/**
 * Plugin activation hook
 */
function relocation_portal_activate() {
    relocation_portal_register_post_types();
    relocation_portal_register_taxonomies();
    relocation_portal_create_default_terms();
    flush_rewrite_rules();
    add_option('relocation_portal_show_welcome_notice', true);
}
register_activation_hook(__FILE__, 'relocation_portal_activate');

/**
 * Plugin deactivation hook
 */
function relocation_portal_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'relocation_portal_deactivate');

/**
 * Register Custom Post Types
 */
function relocation_portal_register_post_types() {
    // Register Guides post type
    register_post_type('guides', array(
        'labels' => array(
            'name' => 'Guides',
            'singular_name' => 'Guide',
            'menu_name' => 'Guides',
            'add_new' => 'Add New Guide',
            'add_new_item' => 'Add New Guide',
            'edit_item' => 'Edit Guide',
            'new_item' => 'New Guide',
            'view_item' => 'View Guide',
            'search_items' => 'Search Guides',
            'not_found' => 'No guides found',
            'not_found_in_trash' => 'No guides found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'guides'),
        'supports' => array('title', 'editor', 'excerpt', 'custom-fields', 'revisions'),
        'show_in_rest' => true,
        'rest_base' => 'guides',
        'menu_icon' => 'dashicons-book-alt',
        'capability_type' => 'post',
        'hierarchical' => false,
        'taxonomies' => array('audience', 'topic', 'stage')
    ));

    // Register FAQs post type
    register_post_type('faqs', array(
        'labels' => array(
            'name' => 'FAQs',
            'singular_name' => 'FAQ',
            'menu_name' => 'FAQs',
            'add_new' => 'Add New FAQ',
            'add_new_item' => 'Add New FAQ',
            'edit_item' => 'Edit FAQ',
            'new_item' => 'New FAQ',
            'view_item' => 'View FAQ',
            'search_items' => 'Search FAQs',
            'not_found' => 'No FAQs found',
            'not_found_in_trash' => 'No FAQs found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'faqs'),
        'supports' => array('title', 'editor', 'custom-fields', 'revisions'),
        'show_in_rest' => true,
        'rest_base' => 'faqs',
        'menu_icon' => 'dashicons-editor-help',
        'capability_type' => 'post',
        'hierarchical' => false,
        'taxonomies' => array('audience', 'topic')
    ));
}
add_action('init', 'relocation_portal_register_post_types');

/**
 * Register Custom Taxonomies
 */
function relocation_portal_register_taxonomies() {
    // Register Audience taxonomy (CRITICAL)
    register_taxonomy('audience', array('guides', 'faqs'), array(
        'labels' => array(
            'name' => 'Audience',
            'singular_name' => 'Audience',
            'menu_name' => 'Audience',
            'all_items' => 'All Audiences',
            'edit_item' => 'Edit Audience',
            'view_item' => 'View Audience',
            'update_item' => 'Update Audience',
            'add_new_item' => 'Add New Audience',
            'new_item_name' => 'New Audience Name',
            'search_items' => 'Search Audiences',
            'not_found' => 'No audiences found'
        ),
        'public' => true,
        'hierarchical' => false,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => false,
        'show_in_rest' => true,
        'rest_base' => 'audience',
        'rewrite' => array('slug' => 'audience')
    ));

    // Register Topic taxonomy
    register_taxonomy('topic', array('guides', 'faqs'), array(
        'labels' => array(
            'name' => 'Topics',
            'singular_name' => 'Topic',
            'menu_name' => 'Topics',
            'all_items' => 'All Topics',
            'edit_item' => 'Edit Topic',
            'view_item' => 'View Topic',
            'update_item' => 'Update Topic',
            'add_new_item' => 'Add New Topic',
            'new_item_name' => 'New Topic Name',
            'search_items' => 'Search Topics',
            'not_found' => 'No topics found'
        ),
        'public' => true,
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'show_in_rest' => true,
        'rest_base' => 'topic',
        'rewrite' => array('slug' => 'topic')
    ));

    // Register Stage taxonomy
    register_taxonomy('stage', array('guides'), array(
        'labels' => array(
            'name' => 'Stages',
            'singular_name' => 'Stage',
            'menu_name' => 'Stages',
            'all_items' => 'All Stages',
            'edit_item' => 'Edit Stage',
            'view_item' => 'View Stage',
            'update_item' => 'Update Stage',
            'add_new_item' => 'Add New Stage',
            'new_item_name' => 'New Stage Name',
            'search_items' => 'Search Stages',
            'not_found' => 'No stages found'
        ),
        'public' => true,
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => false,
        'show_in_rest' => true,
        'rest_base' => 'stage',
        'rewrite' => array('slug' => 'stage')
    ));
}
add_action('init', 'relocation_portal_register_taxonomies');

/**
 * Create default taxonomy terms
 */
function relocation_portal_create_default_terms() {
    // Create default audience terms
    $audiences = array(
        'hu-to-uk' => 'Hungarians moving to UK (Hungarian site)',
        'to-hungary' => 'Anyone moving to Hungary (English site)'
    );
    
    foreach ($audiences as $slug => $name) {
        if (!term_exists($slug, 'audience')) {
            wp_insert_term($name, 'audience', array('slug' => $slug));
        }
    }
    
    // Create default topic terms
    $topics = array(
        'work' => 'Employment, visas, permits',
        'study' => 'Education, language requirements',
        'healthcare' => 'Medical registration, insurance',
        'housing' => 'Accommodation, rental markets',
        'finance' => 'Banking, taxes, costs',
        'legal' => 'Official processes, documentation'
    );
    
    foreach ($topics as $slug => $name) {
        if (!term_exists($slug, 'topic')) {
            wp_insert_term($name, 'topic', array('slug' => $slug));
        }
    }
    
    // Create default stage terms
    $stages = array(
        'research' => 'Planning phase content',
        'prepare' => 'Pre-departure preparation',
        'arrive' => 'First steps upon arrival',
        'settle' => 'Long-term settlement'
    );
    
    foreach ($stages as $slug => $name) {
        if (!term_exists($slug, 'stage')) {
            wp_insert_term($name, 'stage', array('slug' => $slug));
        }
    }
}
add_action('init', 'relocation_portal_create_default_terms');

/**
 * Expose custom fields in REST API to match cms-client expectations
 */
function relocation_portal_register_rest_fields() {
    // Add locale field to guides
    register_rest_field('guides', 'locale', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'locale', true) ?: 'en';
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'locale', $value);
        },
        'schema' => array(
            'description' => 'Content locale (en or hu)',
            'type' => 'string'
        )
    ));
    
    // Add updatedAt field (camelCase for cms-client compatibility)
    register_rest_field('guides', 'updatedAt', array(
        'get_callback' => function($post) {
            return $post['modified'];
        },
        'schema' => array(
            'description' => 'Last updated timestamp',
            'type' => 'string'
        )
    ));
    
    // Keep updated_at for backward compatibility
    register_rest_field('guides', 'updated_at', array(
        'get_callback' => function($post) {
            return $post['modified'];
        },
        'schema' => array(
            'description' => 'Last updated timestamp',
            'type' => 'string'
        )
    ));
    
    // Add audience/topic to meta for cms-client compatibility
    register_rest_field('guides', 'meta', array(
        'get_callback' => function($post) {
            $existing_meta = get_post_meta($post['id']);
            $audience_terms = wp_get_post_terms($post['id'], 'audience', array('fields' => 'slugs'));
            $topic_terms = wp_get_post_terms($post['id'], 'topic', array('fields' => 'slugs'));
            
            $meta = is_array($existing_meta) ? $existing_meta : array();
            $meta['audience'] = !is_wp_error($audience_terms) ? $audience_terms : array();
            $meta['topics'] = !is_wp_error($topic_terms) ? $topic_terms : array();
            
            return $meta;
        },
        'schema' => array(
            'description' => 'Post meta including audience and topics',
            'type' => 'object'
        )
    ));
    
    // Also add as top-level fields for API clarity
    register_rest_field('guides', 'audience', array(
        'get_callback' => function($post) {
            $terms = wp_get_post_terms($post['id'], 'audience', array('fields' => 'slugs'));
            return !is_wp_error($terms) ? $terms : array();
        },
        'schema' => array(
            'description' => 'Audience taxonomy slugs',
            'type' => 'array',
            'items' => array('type' => 'string')
        )
    ));
    
    // Add topic as slug array
    register_rest_field('guides', 'topic', array(
        'get_callback' => function($post) {
            $terms = wp_get_post_terms($post['id'], 'topic', array('fields' => 'slugs'));
            return !is_wp_error($terms) ? $terms : array();
        },
        'schema' => array(
            'description' => 'Topic taxonomy slugs',
            'type' => 'array',
            'items' => array('type' => 'string')
        )
    ));
    
    // Add same fields to FAQs
    register_rest_field('faqs', 'locale', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], 'locale', true) ?: 'en';
        },
        'schema' => array(
            'description' => 'Content locale (en or hu)',
            'type' => 'string'
        )
    ));
    
    register_rest_field('faqs', 'audience', array(
        'get_callback' => function($post) {
            $terms = wp_get_post_terms($post['id'], 'audience', array('fields' => 'slugs'));
            return !is_wp_error($terms) ? $terms : array();
        },
        'schema' => array(
            'description' => 'Audience taxonomy slugs',
            'type' => 'array',
            'items' => array('type' => 'string')
        )
    ));
    
    // Add meta field for FAQs too
    register_rest_field('faqs', 'meta', array(
        'get_callback' => function($post) {
            $existing_meta = get_post_meta($post['id']);
            $audience_terms = wp_get_post_terms($post['id'], 'audience', array('fields' => 'slugs'));
            
            $meta = is_array($existing_meta) ? $existing_meta : array();
            $meta['audience'] = !is_wp_error($audience_terms) ? $audience_terms : array();
            
            return $meta;
        },
        'schema' => array(
            'description' => 'Post meta including audience',
            'type' => 'object'
        )
    ));
}
add_action('rest_api_init', 'relocation_portal_register_rest_fields');

/**
 * Add custom REST API collection parameters for filtering
 */
function relocation_portal_add_rest_filters() {
    // Add audience filter parameter to guides
    add_filter('rest_guides_collection_params', function($params) {
        $params['audience'] = array(
            'description' => 'Filter by audience slug (hu-to-uk or to-hungary)',
            'type' => 'string',
            'validate_callback' => function($param) {
                return in_array($param, array('hu-to-uk', 'to-hungary'));
            }
        );
        $params['topic'] = array(
            'description' => 'Filter by topic slug',
            'type' => 'string'
        );
        $params['lang'] = array(
            'description' => 'Filter by locale (en or hu)',
            'type' => 'string',
            'validate_callback' => function($param) {
                return in_array($param, array('en', 'hu'));
            }
        );
        return $params;
    });
    
    // Add the same for FAQs
    add_filter('rest_faqs_collection_params', function($params) {
        $params['audience'] = array(
            'description' => 'Filter by audience slug (hu-to-uk or to-hungary)',
            'type' => 'string',
            'validate_callback' => function($param) {
                return in_array($param, array('hu-to-uk', 'to-hungary'));
            }
        );
        $params['lang'] = array(
            'description' => 'Filter by locale (en or hu)',
            'type' => 'string',
            'validate_callback' => function($param) {
                return in_array($param, array('en', 'hu'));
            }
        );
        return $params;
    });
    
    // Apply the filters to the actual query
    add_filter('rest_guides_query', 'relocation_portal_apply_rest_filters', 10, 2);
    add_filter('rest_faqs_query', 'relocation_portal_apply_rest_filters', 10, 2);
}
add_action('rest_api_init', 'relocation_portal_add_rest_filters');

/**
 * Apply REST API filters to queries
 */
function relocation_portal_apply_rest_filters($args, $request) {
    $params = $request->get_params();
    
    // Filter by audience
    if (!empty($params['audience'])) {
        $args['tax_query'] = isset($args['tax_query']) ? $args['tax_query'] : array();
        $args['tax_query'][] = array(
            'taxonomy' => 'audience',
            'field' => 'slug',
            'terms' => $params['audience']
        );
    }
    
    // Filter by topic
    if (!empty($params['topic'])) {
        $args['tax_query'] = isset($args['tax_query']) ? $args['tax_query'] : array();
        $args['tax_query'][] = array(
            'taxonomy' => 'topic',
            'field' => 'slug',
            'terms' => $params['topic']
        );
    }
    
    // Filter by locale (custom meta field)
    if (!empty($params['lang'])) {
        $args['meta_query'] = isset($args['meta_query']) ? $args['meta_query'] : array();
        $args['meta_query'][] = array(
            'key' => 'locale',
            'value' => $params['lang'],
            'compare' => '='
        );
    }
    
    return $args;
}

/**
 * Add admin columns
 */
function relocation_portal_add_admin_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['audience'] = 'Audience';
    $new_columns['topic'] = 'Topics';
    $new_columns['locale'] = 'Locale';
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_guides_posts_columns', 'relocation_portal_add_admin_columns');
add_filter('manage_faqs_posts_columns', 'relocation_portal_add_admin_columns');

/**
 * Populate admin columns
 */
function relocation_portal_populate_admin_columns($column, $post_id) {
    switch ($column) {
        case 'audience':
            $terms = get_the_terms($post_id, 'audience');
            if ($terms && !is_wp_error($terms)) {
                $audience_list = array();
                foreach ($terms as $term) {
                    $color = ($term->slug === 'hu-to-uk') ? '#e74c3c' : '#27ae60';
                    $audience_list[] = '<span style="color: ' . $color . ';">' . $term->name . '</span>';
                }
                echo implode(', ', $audience_list);
            } else {
                echo '<span style="color: red;">⚠ REQUIRED</span>';
            }
            break;
        case 'topic':
            $terms = get_the_terms($post_id, 'topic');
            if ($terms && !is_wp_error($terms)) {
                $topic_list = array();
                foreach ($terms as $term) {
                    $topic_list[] = $term->name;
                }
                echo implode(', ', $topic_list);
            }
            break;
        case 'locale':
            $locale = get_post_meta($post_id, 'locale', true);
            if ($locale) {
                echo '<strong>' . strtoupper($locale) . '</strong>';
            } else {
                echo '<span style="color: orange;">⚠ SET LOCALE</span>';
            }
            break;
    }
}
add_action('manage_guides_posts_custom_column', 'relocation_portal_populate_admin_columns', 10, 2);
add_action('manage_faqs_posts_custom_column', 'relocation_portal_populate_admin_columns', 10, 2);

/**
 * Admin notices for content creation guidance
 */
function relocation_portal_admin_notices() {
    $screen = get_current_screen();
    
    if (in_array($screen->id, array('edit-guides', 'edit-faqs'))) {
        echo '<div class="notice notice-info"><p>';
        echo '<strong>Dual-Portal Content Rules:</strong> ';
        echo 'Each post must have an <strong>Audience</strong> and <strong>Locale</strong>:<br>';
        echo '• <strong style="color: #e74c3c;">hu-to-uk + hu:</strong> Hungarian content for Hungarians moving to UK<br>';
        echo '• <strong style="color: #27ae60;">to-hungary + en:</strong> English content for anyone moving to Hungary';
        echo '</p></div>';
    }
    
    // Welcome notice
    if (get_option('relocation_portal_show_welcome_notice')) {
        ?>
        <div class="notice notice-success is-dismissible">
            <h3>✅ Relocation Portal Content Manager Activated!</h3>
            <p><strong>Your dual-portal blog system is now ready!</strong></p>
            <p>
                <a href="<?php echo admin_url('post-new.php?post_type=guides'); ?>" class="button button-primary">Create First Guide</a>
                <a href="<?php echo home_url('/wp-json/wp/v2/guides'); ?>" class="button" target="_blank">Test API</a>
            </p>
        </div>
        <?php
        delete_option('relocation_portal_show_welcome_notice');
    }
}
add_action('admin_notices', 'relocation_portal_admin_notices');

/**
 * Require audience taxonomy and locale on publish
 */
function relocation_portal_validate_on_publish($new_status, $old_status, $post) {
    if ($new_status === 'publish' && in_array($post->post_type, array('guides', 'faqs'))) {
        $errors = array();
        
        // Check audience taxonomy
        $audiences = wp_get_post_terms($post->ID, 'audience');
        if (empty($audiences) || is_wp_error($audiences)) {
            $errors[] = 'You must select an Audience (hu-to-uk OR to-hungary)';
        }
        
        // Check locale meta field
        $locale = get_post_meta($post->ID, 'locale', true);
        if (empty($locale)) {
            $errors[] = 'You must set a Locale (en or hu)';
        }
        
        // If there are errors, prevent publish and show message
        if (!empty($errors)) {
            wp_die(
                '<h1>Content Validation Error</h1>' .
                '<p>The following fields are required before publishing:</p>' .
                '<ul><li>' . implode('</li><li>', $errors) . '</li></ul>' .
                '<p><strong>Dual-Portal Rules:</strong></p>' .
                '<ul>' .
                '<li><strong>Hungarian Site:</strong> Audience = "hu-to-uk" + Locale = "hu"</li>' .
                '<li><strong>English Site:</strong> Audience = "to-hungary" + Locale = "en"</li>' .
                '</ul>',
                'Content Validation Required',
                array('back_link' => true, 'response' => 400)
            );
        }
    }
}
add_action('transition_post_status', 'relocation_portal_validate_on_publish', 10, 3);

/**
 * Add meta boxes for locale field
 */
function relocation_portal_add_meta_boxes() {
    add_meta_box(
        'relocation-portal-locale',
        'Content Locale & Audience',
        'relocation_portal_locale_meta_box',
        array('guides', 'faqs'),
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'relocation_portal_add_meta_boxes');

/**
 * Meta box content
 */
function relocation_portal_locale_meta_box($post) {
    $locale = get_post_meta($post->ID, 'locale', true);
    wp_nonce_field('relocation_portal_locale_nonce', 'locale_nonce');
    ?>
    <p><strong>Select the locale for this content:</strong></p>
    <p>
        <label style="display: block; margin-bottom: 8px;">
            <input type="radio" name="locale" value="en" <?php checked($locale, 'en'); ?> required>
            <strong>English</strong> (for →Hungary portal)
        </label>
        <label style="display: block; margin-bottom: 8px;">
            <input type="radio" name="locale" value="hu" <?php checked($locale, 'hu'); ?> required>
            <strong>Hungarian</strong> (for HU→UK portal)  
        </label>
    </p>
    
    <div style="margin-top: 15px; padding: 10px; background: #f0f8ff; border-left: 3px solid #2271b1;">
        <p style="margin: 0; font-size: 12px; line-height: 1.4;"><strong>Portal Rules:</strong></p>
        <p style="margin: 5px 0 0 0; font-size: 11px; line-height: 1.3;">
            <span style="color: #27ae60;">✓ English + to-hungary:</span> Content about moving TO Hungary<br>
            <span style="color: #e74c3c;">✓ Hungarian + hu-to-uk:</span> Content about moving TO UK
        </p>
    </div>
    
    <?php if (empty($locale)): ?>
    <div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-left: 3px solid #ffc107;">
        <p style="margin: 0; font-size: 12px; color: #856404;">
            <strong>Required:</strong> You must select a locale before publishing.
        </p>
    </div>
    <?php endif; ?>
    <?php
}

/**
 * Save meta box data
 */
function relocation_portal_save_locale_meta($post_id) {
    if (!isset($_POST['locale_nonce']) || !wp_verify_nonce($_POST['locale_nonce'], 'relocation_portal_locale_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    if (isset($_POST['locale'])) {
        update_post_meta($post_id, 'locale', sanitize_text_field($_POST['locale']));
    }
}
add_action('save_post', 'relocation_portal_save_locale_meta');

/**
 * Add JavaScript for validation feedback
 */
function relocation_portal_admin_scripts($hook) {
    global $post_type;
    
    if (in_array($hook, array('post-new.php', 'post.php')) && in_array($post_type, array('guides', 'faqs'))) {
        ?>
        <script>
        jQuery(document).ready(function($) {
            // Check validation on publish button click
            $('#publish').on('click', function(e) {
                var errors = [];
                
                // Check audience
                if ($('input[name="tax_input[audience][]"]:checked').length === 0) {
                    errors.push('Please select an Audience (Hungarian site or English site)');
                }
                
                // Check locale
                if ($('input[name="locale"]:checked').length === 0) {
                    errors.push('Please select a Locale (English or Hungarian)');
                }
                
                if (errors.length > 0) {
                    alert('Content Validation Required:\n\n• ' + errors.join('\n• ') + '\n\nYou must complete these fields before publishing.');
                    e.preventDefault();
                    return false;
                }
            });
        });
        </script>
        <?php
    }
}
add_action('admin_head', 'relocation_portal_admin_scripts');