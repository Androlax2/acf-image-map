import Point from './Shapes/Point';
import Poly from './Shapes/Poly';

/* eslint-disable */

(
  function ($) {
      if (typeof acf.add_action === 'undefined') {
          return;
      }

      /**
       * Ready Append
       *
       * These are 2 events which are fired during the page load.
       * ready = on page load similar to $(document).ready()
       * append = on new DOM elements appended via repeater field
       *
       * @param    element jQuery element which contains the ACF fields
       * @return void
       */
      acf.add_action('ready append', function (element) {
          acf.get_fields(
            {
                type: 'image_map'
            },
            element
          ).each(function () {
              if ($(this).find('.acfImageMapPoint').length === 1) {
                  const point = new Point($(this));
                  point.init();
              } else if ($(this).find('.acfImageMapPoly').length === 1) {
                  const poly = new Poly($(this));
                  poly.init();
              }
          });
      });
  }
)(jQuery);
