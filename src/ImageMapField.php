<?php

namespace Androlax2\AcfImageMap;

use acf_field;
use Androlax2\AcfImageMap\Contracts\Shape as ShapeContract;
use Androlax2\AcfImageMap\Shapes\Point;

class ImageMapField extends acf_field
{
    /**
     * Path to the assets path of the field.
     *
     * @var string
     */
    public $uri;

    /**
     * The field name.
     *
     * @var string
     */
    public $name = 'image_map';

    /**
     * The field label.
     *
     * @var string
     */
    public $label = 'Image Map';

    /**
     * The field category.
     *
     * @var string
     */
    public $category = 'basic';

    /**
     * Default shape used in settings.
     *
     * @var ShapeContract
     */
    protected $defaultShape;

    /**
     * All shapes object.
     *
     * @var array
     */
    protected $shapes = [];

    /**
     * Create new image map field instance.
     *
     * @param string $uri Path to the assets path of the field.
     *
     * @return void
     */
    public function __construct(string $uri)
    {
        $this->uri = $uri;
        $this->shapes = $this->getShapes();
        $this->defaultShape = $this->getDefaultShape();
        parent::__construct();
    }

    /**
     * This action is called in the admin_enqueue_scripts action on the edit screen where
     * your field is created.
     *
     * @return void
     * @SuppressWarnings(PHPMD.CamelCaseMethodName)
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function input_admin_enqueue_scripts(): void
    {
        wp_enqueue_script("acf-{$this->name}", $this->asset('js/field.js'), [], null);
        wp_enqueue_style("acf-{$this->name}", $this->asset('css/field.css'), [], null);
    }

    /**
     * Create the HTML interface for your field.
     *
     * @param array $field
     *
     * @return void
     * @SuppressWarnings(PHPMD.CamelCaseMethodName)
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function render_field(array $field)
    {
        $this->findShape($field['shape'])->renderShape($field);
    }

    /**
     * Create extra settings for your field.
     * These are visible when editing a field.
     *
     * @param array $field
     *
     * @return void
     * @SuppressWarnings(PHPMD.CamelCaseMethodName)
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function render_field_settings(array $field)
    {
        // Image to use.
        acf_render_field_setting($field, [
            'name'         => 'image_field_label',
            'label'        => 'Image Field Label',
            'instructions' => 'Field label of image field to map.',
            'type'         => 'text',
            'required'     => true,
        ]);

        // Shape to use.
        acf_render_field_setting($field, [
            'name'          => 'shape',
            'label'         => 'Shape',
            'instructions'  => 'The shape to use to map the image.',
            'type'          => 'select',
            'ui'            => 1,
            'required'      => true,
            'default_value' => $this->defaultShape->getLabel(),
            'choices'       => collect($this->shapes)
                ->mapWithKeys(function (ShapeContract $shape) {
                    return [$shape->getName() => $shape->getLabel()];
                })
                ->toArray(),
        ]);

        // Generate fields for each shape, depending on what the user selected as a shape.
        foreach ($this->shapes as $shape) {
            /** @var ShapeContract $shape */
            $shape->renderShapeSettings($field, 'shape');
        }
    }

    /**
     * This filter is applied to the $value after it is loaded from the database and
     * before it is returned to the template.
     *
     * @param mixed $value
     * @param array $field
     *
     * @return mixed
     * @SuppressWarnings(PHPMD.CamelCaseMethodName)
     * @SuppressWarnings(PHPMD.CamelCaseParameterName)
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function format_value($value, $post_id, $field)
    {
        return $this->findShape($field['shape'])->formatValue($value);
    }

    /**
     * Find a Shape in the $shapes array.
     *
     * @param string $shape Label name of the shape.
     *
     * @return ShapeContract
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    protected function findShape(string $shape): ShapeContract
    {
        return collect($this->shapes)->first(
            function (ShapeContract $item, $key) use ($shape) {
                return $key === $shape;
            }
        );
    }

    /**
     * Return an array containing the shapes object.
     *
     * @return array
     */
    protected function getShapes(): array
    {
        $shapes = [];

        foreach (glob(dirname(__DIR__) . '/src/Shapes/*') as $shapeFile) {
            include_once $shapeFile;

            $class = basename($shapeFile, '.php');
            $class = "Androlax2\\AcfImageMap\\Shapes\\{$class}";

            /** @var ShapeContract $shape */
            $shape = new $class();

            $shapes[$shape->getName()] = $shape;
        }

        return $shapes;
    }

    /**
     * Return the default shape used in the settings.
     *
     * @return ShapeContract
     */
    protected function getDefaultShape(): ShapeContract
    {
        return new Point();
    }

    /**
     * Resolve the URI for an asset.
     *
     * @param string $path
     *
     * @return string
     */
    protected function asset(string $path): string
    {
        return "{$this->uri}/{$path}";
    }
}
