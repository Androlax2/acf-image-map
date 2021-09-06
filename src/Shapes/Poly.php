<?php

namespace Androlax2\AcfImageMap\Shapes;

use Androlax2\AcfImageMap\Contracts\Shape;

class Poly implements Shape
{
    /** @inheritDoc */
    public function getLabel(): string
    {
        return 'Poly';
    }

    /** @inheritDoc */
    public function getName(): string
    {
        return 'poly';
    }

    /**
     * @inheritDoc
     * @SuppressWarnings(PHPMD.ShortVariable)
     */
    public function renderShape(array $field): void
    {
        $name = esc_attr($field['name']);
        $svgCoords = esc_attr($field['value']['svg_coords']);
        $areaCoords = esc_attr($field['value']['area_coords']);

        $imageLabel = isset($field['image_field_label']) ? esc_attr($field['image_field_label']) : '';

        // Create circles & polygon HTML
        $circles = '';
        $polygon = '';
        if ($svgCoords) {
            $polygon = "<polygon points='{$svgCoords}' class='acfImageMapPoly__polygon'></polygon>";
            $circlesCoords = array_chunk(explode(',', $svgCoords), 2);
            foreach ($circlesCoords as $circleCoords) {
                $circles .= <<<HTML
                <circle cx="{$circleCoords[0]}" cy="{$circleCoords[1]}" r="5" class="acfImageMapPoly__point"></circle>
            HTML;
            }
        }

        echo <<<HTML
            <div class="acfImageMapPoly">
                <img data-label="{$imageLabel}" />
                <svg class="acfImageMapPoly__svg" style="width: 100%;">
                    {$polygon}
                    {$circles}
                </svg>
            </div>
            <button class="acfImageMapPoly__reset button">Reset</button>
            <input type="hidden" class="acfImageMapPoly__input" name="{$name}[svg_coords]" value="{$svgCoords}" />
            <input type="hidden" class="acfImageMapPoly__areaInput"  name="{$name}[area_coords]" value="{$areaCoords}" />
        HTML;
    }

    /** @inheritDoc */
    public function renderShapeSettings(array $fields, string $fieldName): void
    {
    }

    /** @inheritDoc */
    public function formatValue($value): array
    {
        return [
            'area_coords' => $value['area_coords'],
        ];
    }
}
