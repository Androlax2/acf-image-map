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
        $imageWidth = esc_attr($field['value']['image_width']) ?: null;

        $imageLabel = isset($field['image_field_label']) ? esc_attr($field['image_field_label']) : '';

        echo <<<HTML
            <div class="acfImageMapPoly">
                <img data-label="{$imageLabel}" />
                <svg class="acfImageMapPoly__svg" style="width: 100%;"></svg>
            </div>
            <button class="acfImageMapPoly__reset button">Reset</button>
            <input type="hidden" class="acfImageMapPoly__input" name="{$name}[svg_coords]" value="{$svgCoords}" />
            <input type="hidden" class="acfImageMapPoly__imageWidth" name="{$name}[image_width]" value="{$imageWidth}" />
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
