export default class Point {
    /**
     * Create an instance of Point.
     *
     * @param $field
     */
    constructor($field) {
        this.$field = {
            element: $field,
            image: $field.find('img'),
            point: $field.find('.acfImageMapPoint__point'),
            input: $field.find('.acfImageMapPoint__input'),
        };
        const fieldSelector = this.$field.image.attr('data-label');
        this.$field.selector = `[data-name="${fieldSelector}"]`;
        this.$field.settings = {
            percentage: parseInt(this.$field.image.attr('data-percent-based')),
        };

        this.$linkedImage = this._getLinkedImage();
    }

    /**
     * Get the linked image according to user choice.
     *
     * @returns {boolean|*}
     * @private
     */
    _getLinkedImage() {
        let $imgCon = this.$field.element.siblings(this.$field.selector);
        let $repeaterParent = this.$field.element.parents('.acf-field-repeater');

        while (!$imgCon.length) {
            if (!$repeaterParent.length) {
                console.error('Could not find a match for the linked image');
                return false;
            }

            $imgCon = $repeaterParent.siblings(this.$field.selector);

            // Get the next repeater parent
            $repeaterParent = $repeaterParent.parents('.acf-field-repeater');
        }

        return $imgCon.find('img[data-name="image"]');
    }

    /**
     * Load the image downloaded by user to the image map field.
     *
     * @private
     */
    _loadImage() {
        const src = this.$linkedImage.attr('src');
        if (!src) {
            return;
        }

        this.$field.image.attr('src', src);
    }

    /**
     * When user clicks on the image.
     *
     * @param e
     * @private
     */
    _handleClick(e) {
        const { width, height } = this._imageDimensions();

        let x = `${e.offsetX}px`;
        let y = `${e.offsetY}px`;

        if (this.$field.settings.percentage) {
            x = `${((parseInt(x) / width) * 100).toFixed(2)}%`;
            y = `${((parseInt(y) / height) * 100).toFixed(2)}%`;
        }

        this._movePoint(x, y);

        this.$field.input.val(`${x},${y}`);
        this.$field.input.change();
    }

    /**
     * Move the point on the image.
     *
     * @param x
     * @param y
     * @private
     */
    _movePoint(x, y) {
        this.$field.point.css('left', x).css('top', y).addClass('isActive');
    }

    /**
     * Return width and height of the image.
     *
     * @returns {{width, height}}
     * @private
     */
    _imageDimensions() {
        return {
            width: this.$field.image.width(),
            height: this.$field.image.height(),
        };
    }

    /**
     * When the input with coords change.
     *
     * @private
     */
    _handleInputChange() {
        const coordinates = this.$field.input.val().split(',');

        if (coordinates.length !== 2) {
            return;
        }

        const tempX = coordinates[0];
        const tempY = coordinates[1];

        if (
            // @formatter:off
            isNaN(parseInt(tempX)) ||
            (tempX.indexOf('%') === -1 && tempX.indexOf('px') === -1) ||
            isNaN(parseInt(tempY)) ||
            (tempY.indexOf('%') === -1 && tempY.indexOf('px') === -1)
            // @formatter:on
        ) {
            return;
        }

        this._movePoint(tempX, tempY);
    }

    /**
     * Set up the object.
     */
    init() {
        if (!this.$linkedImage) {
            return;
        }

        this._loadImage();
        this.$linkedImage.on('load', this._loadImage.bind(this));

        this.$field.image.on('click', this._handleClick.bind(this));
        this.$field.input.on('change input', this._handleInputChange.bind(this));
    }
}
