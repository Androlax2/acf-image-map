!function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,i(a.key),a)}}function i(e){var i=function(e,i){if("object"!=t(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=t(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(i)?i:i+""}var n=function(){return t=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.$field={element:e,image:e.find("img"),point:e.find(".acfImageMapPoint__point"),input:e.find(".acfImageMapPoint__input")};var i=this.$field.image.attr("data-label");this.$field.selector='[data-name="'.concat(i,'"]'),this.$field.settings={percentage:parseInt(this.$field.image.attr("data-percent-based"))},this.$linkedImage=this._getLinkedImage()},i=[{key:"_getLinkedImage",value:function(){for(var t=this.$field.element.siblings(this.$field.selector),e=this.$field.element.parents(".acf-field-repeater");!t.length;){if(!e.length)return console.error("Could not find a match for the linked image"),!1;t=e.siblings(this.$field.selector),e=e.parents(".acf-field-repeater")}return t.find('img[data-name="image"]')}},{key:"_loadImage",value:function(){var t=this.$linkedImage.attr("src");t&&this.$field.image.attr("src",t)}},{key:"_handleClick",value:function(t){var e=this._imageDimensions(),i=e.width,n=e.height,a="".concat(t.offsetX,"px"),o="".concat(t.offsetY,"px");this.$field.settings.percentage&&(a="".concat((parseInt(a)/i*100).toFixed(2),"%"),o="".concat((parseInt(o)/n*100).toFixed(2),"%")),this._movePoint(a,o),this.$field.input.val("".concat(a,",").concat(o)),this.$field.input.change()}},{key:"_movePoint",value:function(t,e){this.$field.point.css("left",t).css("top",e).addClass("isActive")}},{key:"_imageDimensions",value:function(){return{width:this.$field.image.width(),height:this.$field.image.height()}}},{key:"_handleInputChange",value:function(){var t=this.$field.input.val().split(",");if(2===t.length){var e=t[0],i=t[1];isNaN(parseInt(e))||-1===e.indexOf("%")&&-1===e.indexOf("px")||isNaN(parseInt(i))||-1===i.indexOf("%")&&-1===i.indexOf("px")||this._movePoint(e,i)}}},{key:"init",value:function(){this.$linkedImage&&(this._loadImage(),this.$linkedImage.on("load",this._loadImage.bind(this)),this.$field.image.on("click",this._handleClick.bind(this)),this.$field.input.on("change input",this._handleInputChange.bind(this)))}}],i&&e(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,i}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function o(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,r(n.key),n)}}function r(t){var e=function(t,e){if("object"!=a(t)||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var n=i.call(t,"string");if("object"!=a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==a(e)?e:e+""}var l,s=function(){return t=function t(e){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.$field={element:e,image:e.find("img"),svg:e.find(".acfImageMapPoly__svg"),input:e.find(".acfImageMapPoly__input"),resetButton:e.find(".acfImageMapPoly__reset"),imageWidthInput:e.find(".acfImageMapPoly__imageWidth"),areaInput:e.find(".acfImageMapPoly__areaInput")};var n,a=this.$field.image.attr("data-label");if(this.$field.selector='[data-name="'.concat(a,'"]'),this.$linkedImage=this._getLinkedImage(),this.pointCoords=[],this.$field.input.val()){var o=parseInt(this.$field.imageWidthInput.val());(n=this.$field.input.val().split(","),Array.from({length:Math.ceil(n.length/2)},(function(t,e){return n.slice(2*e,2*e+2)}))).forEach((function(t){var e=parseInt(t[0]),n=parseInt(t[1]),a=i._createPointElement();i.pointCoords.push({imageWidth:o,$el:a,x:e,y:n}),i._movePoint(e,n,a)}))}this.polygon=this._createPolygon()},e=[{key:"_createPolygon",value:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","polygon");return t.classList.add("acfImageMapPoly__polygon"),t}},{key:"_getLinkedImage",value:function(){for(var t=this.$field.element.siblings(this.$field.selector),e=this.$field.element.parents(".acf-field-repeater");!t.length;){if(!e.length)return console.error("Could not find a match for the linked image"),!1;t=e.siblings(this.$field.selector),e=e.parents(".acf-field-repeater")}return t.find('img[data-name="image"]')}},{key:"_loadImage",value:function(){var t=this.$linkedImage.attr("src");t&&this.$field.image.attr("src",t)}},{key:"_createPointElement",value:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","circle");return t.classList.add("acfImageMapPoly__point"),t.setAttribute("r","5"),t}},{key:"_updatePolygon",value:function(){var t="";this.pointCoords.forEach((function(e,i){i>0&&(t+=","),t+="".concat(e.x,",").concat(e.y)})),this.polygon.setAttribute("points",t),this.$field.svg.prepend(this.polygon)}},{key:"_handleClick",value:function(t){var e=t.offsetX,i=t.offsetY,n=this._createPointElement();this.pointCoords.push({imageWidth:this._imageDimensions().width,$el:n,x:e,y:i}),this._movePoint(e,i,n),this._update(e,i)}},{key:"recalculate",value:function(){var t=this;if(0!==this.pointCoords.length){var e=this._imageDimensions().width;this.pointCoords.forEach((function(i){i.x=Math.round(i.x*(e/i.imageWidth)),i.y=Math.round(i.y*(e/i.imageWidth)),i.imageWidth=e,t._movePoint(i.x,i.y,i.$el,!1)})),this._update()}}},{key:"_reset",value:function(){this.pointCoords=[],this.$field.svg.empty(),this.$field.input.val(""),this.$field.areaInput.val(""),this.polygon=this._createPolygon()}},{key:"_update",value:function(){this._updatePolygon(),this.$field.input.val(this.polygon.getAttribute("points")),this.$field.imageWidthInput.val(this._imageDimensions().width),this._updateArea()}},{key:"_updateArea",value:function(){var t=this._imageDimensions(),e=t.width,i=t.naturalWidth/e,n=this.polygon.getAttribute("points").split(",");this.$field.areaInput.val(n.map((function(t){return Math.round(t*i)})).join(","))}},{key:"_movePoint",value:function(t,e,i){var n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];i.setAttribute("cx",t),i.setAttribute("cy",e),n&&this.$field.svg.append(i)}},{key:"_imageDimensions",value:function(){return{width:this.$field.image.width(),height:this.$field.image.height(),naturalWidth:this.$field.image[0].naturalWidth,naturalHeight:this.$field.image[0].naturalHeight}}},{key:"init",value:function(){this.$linkedImage&&(this._loadImage(),this.$linkedImage.on("load",this._loadImage.bind(this)),this.$field.svg.on("click",this._handleClick.bind(this)),this.$field.resetButton.on("click",this._reset.bind(this)),window.addEventListener("resize",this.recalculate.bind(this)),window.addEventListener("load",this.recalculate.bind(this)))}}],e&&o(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();l=jQuery,void 0!==acf.add_action&&acf.add_action("ready append",(function(t){acf.get_fields({type:"image_map"},t).each((function(){1===l(this).find(".acfImageMapPoint").length?new n(l(this)).init():1===l(this).find(".acfImageMapPoly").length&&new s(l(this)).init()}))}))}();