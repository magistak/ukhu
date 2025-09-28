<?php
/**
 * WordPress Functions for Dual-Portal Relocation System
 * 
 * This implements the custom post types, taxonomies, and REST API configuration
 * for the Hungarian (HU→UK) and English (→HU) relocation portals.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Types
 */
function register_relocation_post_types() {
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
        'show_in_rest' => true, // Enable REST API
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

    // Register Checklist Templates post type
    register_post_type('checklist_templates', array(
        'labels' => array(
            'name' => 'Checklist Templates',
            'singular_name' => 'Checklist Template',
            'menu_name' => 'Checklists',
            'add_new' => 'Add New Template',
            'add_new_item' => 'Add New Checklist Template',
            'edit_item' => 'Edit Template',
            'new_item' => 'New Template',
            'view_item' => 'View Template',
            'search_items' => 'Search Templates',
            'not_found' => 'No templates found',
            'not_found_in_trash' => 'No templates found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'checklist-templates'),
        'supports' => array('title', 'editor', 'custom-fields', 'revisions'),
        'show_in_rest' => true,
        'rest_base' => 'checklist_templates',
        'menu_icon' => 'dashicons-yes-alt',
        'capability_type' => 'post',
        'hierarchical' => false,
        'taxonomies' => array('audience', 'topic', 'stage')
    ));
}
add_action('init', 'register_relocation_post_types');

/**
 * Register Custom Taxonomies
 */
function register_relocation_taxonomies() {
    // Register Audience taxonomy (CRITICAL - this defines which portal content belongs to)
    register_taxonomy('audience', array('guides', 'faqs', 'checklist_templates'), array(
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
    register_taxonomy('topic', array('guides', 'faqs', 'checklist_templates'), array(
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
    register_taxonomy('stage', array('guides', 'checklist_templates'), array(
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
add_action('init', 'register_relocation_taxonomies');

/**
 * Create default taxonomy terms
 */
function create_default_taxonomy_terms() {
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
add_action('init', 'create_default_taxonomy_terms');

/**
 * Expose custom fields and taxonomies in REST API
 */
function expose_custom_fields_in_rest() {
    // Register locale meta field for REST API
    register_meta('post', 'locale', array(
        'type' => 'string',
        'description' => 'Content locale (en or hu)',
        'single' => true,
        'show_in_rest' => true,
        'object_subtype' => 'guides'
    ));
    
    // Register last updated meta field
    register_meta('post', 'last_updated', array(
        'type' => 'string',
        'description' => 'Last updated date',
        'single' => true,
        'show_in_rest' => true,
        'object_subtype' => 'guides'
    ));
    
    // Register references meta field
    register_meta('post', 'references', array(
        'type' => 'string',
        'description' => 'JSON string of reference links',
        'single' => true,
        'show_in_rest' => true,
        'object_subtype' => 'guides'
    ));
    
    // Register actions meta field
    register_meta('post', 'actions', array(
        'type' => 'string',
        'description' => 'JSON string of call-to-action buttons',
        'single' => true,
        'show_in_rest' => true,
        'object_subtype' => 'guides'
    ));
}
add_action('init', 'expose_custom_fields_in_rest');

/**
 * Add custom REST API endpoints for filtered content
 */
function add_custom_rest_endpoints() {
    register_rest_route('wp/v2', '/guides/by-audience/(?P<audience>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_guides_by_audience',
        'args' => array(
            'audience' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return in_array($param, array('hu-to-uk', 'to-hungary'));
                }
            )
        )
    ));
}
add_action('rest_api_init', 'add_custom_rest_endpoints');

/**
 * Custom REST endpoint callback for audience-filtered guides
 */
function get_guides_by_audience($request) {
    $audience = $request['audience'];
    
    $args = array(
        'post_type' => 'guides',
        'post_status' => 'publish',
        'posts_per_page' => 20,
        'tax_query' => array(
            array(
                'taxonomy' => 'audience',
                'field' => 'slug',
                'terms' => $audience
            )
        )
    );
    
    $posts = get_posts($args);
    $data = array();
    
    foreach ($posts as $post) {
        $post_data = array(
            'id' => $post->ID,
            'slug' => $post->post_name,
            'title' => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'content' => $post->post_content,
            'locale' => get_post_meta($post->ID, 'locale', true),
            'updated_at' => $post->post_modified,
            'topics' => wp_get_post_terms($post->ID, 'topic', array('fields' => 'slugs')),
            'audience' => wp_get_post_terms($post->ID, 'audience', array('fields' => 'slugs')),
            'stage' => wp_get_post_terms($post->ID, 'stage', array('fields' => 'slugs'))
        );
        $data[] = $post_data;
    }
    
    return new WP_REST_Response($data, 200);
}

/**
 * Add admin notices for setup guidance
 */
function relocation_portal_admin_notices() {
    $screen = get_current_screen();
    
    if ($screen->id === 'edit-guides') {
        echo '<div class="notice notice-info"><p>';
        echo '<strong>Dual-Portal Content Creation:</strong> ';
        echo 'Remember to set the correct <strong>Audience</strong> for each guide:<br>';
        echo '• <strong>hu-to-uk</strong>: Content for Hungarians moving to UK (write in Hungarian)<br>';
        echo '• <strong>to-hungary</strong>: Content for anyone moving to Hungary (write in English)';
        echo '</p></div>';
    }
}
add_action('admin_notices', 'relocation_portal_admin_notices');

/**
 * Add custom columns to the guides admin list
 */
function add_guides_custom_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['audience'] = 'Audience';
    $new_columns['topic'] = 'Topics';
    $new_columns['locale'] = 'Locale';
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_guides_posts_columns', 'add_guides_custom_columns');

/**
 * Populate custom columns in guides admin list
 */
function populate_guides_custom_columns($column, $post_id) {
    switch ($column) {
        case 'audience':
            $terms = get_the_terms($post_id, 'audience');
            if ($terms && !is_wp_error($terms)) {
                $audience_list = array();
                foreach ($terms as $term) {
                    $audience_list[] = $term->name;
                }
                echo implode(', ', $audience_list);
            } else {
                echo '<span style="color: red;">⚠ Not Set</span>';
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
                echo strtoupper($locale);
            } else {
                echo '<span style="color: orange;">⚠ Not Set</span>';
            }
            break;
    }
}
add_action('manage_guides_posts_custom_column', 'populate_guides_custom_columns', 10, 2);