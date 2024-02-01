<?php

namespace Androlax2\AcfImageMap\Shapes;

use Androlax2\AcfImageMap\Contracts\Shape;

class Point implements Shape
{
    /** @inheritDoc */
    public function getLabel(): string
    {
        return 'Point';
    }

    /** @inheritDoc */
    public function getName(): string
    {
        return 'point';
    }

    /**
     * @inhertiDoc
     * @SuppressWarnings(PHPMD.ShortVariable)
     */
    public function renderShape(array $field): void
    {
        $name = esc_attr($field['name']);
        $value = esc_attr($field['value']);

        $imageLabel = isset($field['image_field_label']) ? esc_attr($field['image_field_label']) : '';
        $percentBased = isset($field[$this->settings()['percentage']['name']]) && $field[$this->settings()['percentage']['name']] ? 1 : 0;

        $xyPair = explode(',', $value);

        $x = !empty($xyPair[0]) ? $xyPair[0] : 0;
        $y = !empty($xyPair[1]) ? $xyPair[1] : 0;

        $isPointActive = $x !== 0 && $y !== 0;
        $pointClass = 'acfImageMapPoint__point';
        if ($isPointActive) {
            $pointClass .= ' isActive';
        }

        echo <<<HTML
            <div class="acfImageMapPoint">
                <img data-percent-based="{$percentBased}" data-label="{$imageLabel}" />
                <span class="{$pointClass}" style="left: {$x}; top: {$y}"></span>
            </div>
            <input type="text" class="acfImageMapPoint__input" name="{$name}" value="{$value}" />
        HTML;
    }

    /** @inheritDoc */
    public function renderShapeSettings(array $fields, string $fieldName): void
    {
        $conditionalLogic = [
            [
                'field' => $fieldName,
                'operator' => '==',
                'value' => $this->getName(),
            ],
        ];

        foreach ($this->settings() as $setting) {
            acf_render_field_setting($fields, array_merge($setting, ['conditional_logic' => $conditionalLogic]));
        }
    }

    /**
     * Format the point to return an array containing the coords.
     *
     * @param mixed $value Coords of the point separated by a comma.
     *
     * @return array{x: string, y: string}
     */
    public function formatValue($value): array
    {
        $coords = explode(',', $value);

        return [
            'x' => $coords[0] ?? '0',
            'y' => $coords[1] ?? '0',
        ];
    }

    /**
     * Return an array of settings for this shape.
     *
     * @return array<string, array<string, mixed>>
     */
    protected function settings(): array
    {
        return [
            'percentage' => [
                'name' => 'percentage',
                'label' => 'Percentage Based Coordinates',
                'instructions' => 'Convert the coordinate pair to percentages instead of the raw X / Y pair.',
                'ui' => 1,
                'type' => 'true_false',
            ],
        ];
    }
}
