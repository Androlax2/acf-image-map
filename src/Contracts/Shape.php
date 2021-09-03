<?php

namespace Androlax2\AcfImageMap\Contracts;

interface Shape
{
    /**
     * Get the label name of the shape.
     *
     * @return string The label used for the shape.
     */
    public function getLabel(): string;

    /**
     * Get the name of the shape.
     *
     * @return string The name used for the shape.
     */
    public function getName(): string;

    /**
     * Create the HTML interface for your shape.
     *
     * @param array $field
     */
    public function renderShape(array $field): void;

    /**
     * Create settings for your shape.
     * These are visible when editing the image map field.
     *
     * @param array  $fields    The field being edited
     * @param string $fieldName Field name used to select the shape to use.
     */
    public function renderShapeSettings(array $fields, string $fieldName): void;

    /**
     * Format the value returning by a shape to the front-end.
     *
     * @return mixed
     */
    public function formatValue($value);
}
