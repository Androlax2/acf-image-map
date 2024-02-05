<?php

/**
 * Plugin Name: Advanced Custom Fields: Image map
 * Plugin URI:  1.0.3
 * Description: An ACF field to map shapes in image.
 * Version:     1.0.3
 * Author:      Théo Benoit
 * Author URI:  https://github.com/Androlax2
 */

namespace Androlax2\AcfImageMap;

// @phpstan-ignore-next-line
add_filter(
    'after_setup_theme',
    new class {
        /**
         * The asset public path.
         *
         * @var string
         */
        protected $assetPath = 'dist';

        /**
         * Invoke the plugin.
         *
         * @return void
         */
        public function __invoke()
        {
            if (file_exists($composer = sprintf('%s/vendor/autoload.php', __DIR__))) {
                require_once $composer;
            }

            $this->register();
        }

        /**
         * Register the Image Map field type with ACF.
         *
         * @return void
         */
        protected function register()
        {
            foreach (['acf/include_field_types', 'acf/register_fields'] as $hook) {
                add_filter($hook, function () {
                    return new ImageMapField(sprintf('%s%s', plugin_dir_url(__FILE__), $this->assetPath));
                });
            }
        }
    },
);
