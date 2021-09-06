import { chunk } from '../helpers';

export default class Poly {
    /**
     * Create an instance of Poly.
     *
     * @param $field
     */
    constructor($field) {
        this.$field = {
            element: $field,
            image: $field.find('img'),
            svg: $field.find('.acfImageMapPoly__svg'),
            input: $field.find('.acfImageMapPoly__input'),
            resetButton: $field.find('.acfImageMapPoly__reset'),
            imageWidthInput: $field.find('.acfImageMapPoly__imageWidth'),
            areaInput: $field.find('.acfImageMapPoly__areaInput'),
        };
        const fieldSelector = this.$field.image.attr('data-label');
        this.$field.selector = `[data-name="${fieldSelector}"]`;

        this.$linkedImage = this._getLinkedImage();

        this.pointCoords = [];
        if (this.$field.input.val()) {
            const imageWidth = parseInt(this.$field.imageWidthInput.val());

            chunk(this.$field.input.val().split(','), 2).forEach((coords) => {
                // @formatter:off
                const x = parseInt(coords[0]);
                const y = parseInt(coords[1]);
                // @formatter:on

                const $point = this._createPointElement();

                this.pointCoords.push({
                    imageWidth: imageWidth,
                    $el: $point,
                    x,
                    y,
                });

                this._movePoint(x, y, $point);
            });
        }

        this.polygon = this._createPolygon();
    }

    /**
     * Create a polygon.
     *
     * @private
     */
    _createPolygon() {
        const $polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        $polygon.classList.add('acfImageMapPoly__polygon');
        return $polygon;
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
     * Create a point element.
     *
     * @private
     */
    _createPointElement() {
        const $point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        $point.classList.add('acfImageMapPoly__point');
        $point.setAttribute('r', '5');
        return $point;
    }

    /**
     * Update the polygon
     *
     * @private
     */
    _updatePolygon() {
        let points = '';
        this.pointCoords.forEach((pointCoord, index) => {
            if (index > 0) {
                points += ',';
            }
            points += `${pointCoord.x},${pointCoord.y}`;
        });

        this.polygon.setAttribute('points', points);
        this.$field.svg.prepend(this.polygon);
    }

    /**
     * When user clicks on the image.
     *
     * @param e
     * @private
     */
    _handleClick(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const $point = this._createPointElement();

        this.pointCoords.push({
            imageWidth: this._imageDimensions().width,
            $el: $point,
            x,
            y,
        });

        this._movePoint(x, y, $point);
        this._update(x, y);
    }

    /**
     * Recalculate everything
     *
     * @private
     */
    recalculate() {
        if (this.pointCoords.length === 0) {
            return;
        }

        const { width } = this._imageDimensions();

        this.pointCoords.forEach((pointCoord) => {
            // @formatter:off
            pointCoord.x = Math.round(pointCoord.x * (width / pointCoord.imageWidth));
            pointCoord.y = Math.round(pointCoord.y * (width / pointCoord.imageWidth));
            // @formatter:on
            pointCoord.imageWidth = width;
            this._movePoint(pointCoord.x, pointCoord.y, pointCoord.$el, false);
        });

        this._update();
    }

    /**
     * Reset the image map.
     *
     * @private
     */
    _reset() {
        this.pointCoords = [];
        this.$field.svg.empty();
        this.$field.input.val('');
        this.$field.areaInput.val('');
        this.polygon = this._createPolygon();
    }

    /**
     * Update everything about coords (polygon, area)
     *
     * @private
     */
    _update() {
        this._updatePolygon();
        this.$field.input.val(this.polygon.getAttribute('points'));
        this.$field.imageWidthInput.val(this._imageDimensions().width);
        this._updateArea();
    }

    /**
     * Update area input with area coords.
     * (Will be sent to the front end later)
     *
     * @private
     */
    _updateArea() {
        const { width, naturalWidth } = this._imageDimensions();
        const ratio = naturalWidth / width;

        const points = this.polygon.getAttribute('points').split(',');

        // @formatter:off
        this.$field.areaInput.val(points.map((point) => Math.round(point * ratio)).join(','));
        // @formatter:on
    }

    /**
     * Move the point on the image.
     *
     * @param x
     * @param y
     * @param $point
     * @param append
     * @private
     */
    _movePoint(x, y, $point, append = true) {
        $point.setAttribute('cx', x);
        $point.setAttribute('cy', y);
        if (append) {
            this.$field.svg.append($point);
        }
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
            naturalWidth: this.$field.image[0].naturalWidth,
            naturalHeight: this.$field.image[0].naturalHeight,
        };
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

        this.$field.svg.on('click', this._handleClick.bind(this));
        this.$field.resetButton.on('click', this._reset.bind(this));
        window.addEventListener('resize', this.recalculate.bind(this));
        window.addEventListener('load', this.recalculate.bind(this));
    }
}
