# ACF Image Map

![Example](https://user-images.githubusercontent.com/39646949/132213349-31b4fee3-1a54-4f9a-82cb-fddbebf5aead.gif)

## Requirements

- [PHP](https://secure.php.net/manual/en/install.php) >= 7.3
- [Composer](https://getcomposer.org/download/)

## Installation

### Bedrock

Install via Composer:

```bash
$ composer require androlax2/acf-image-map
```

### Manual

Download the release `.zip` and install into `wp-content/plugins`.

## Usage

First you need to define an image that will be used to add different shapes on it.

### Shapes

You can use different shapes, for now you can use **polygon** and **points**.
On the front end :

- It will return an array with your coords in an `area_coords` for the **polygon**,
- It will return an array with the point coord in an `x` & `y` for the **point**.

### ACF Composer

If you are using [ACF Builder](https://github.com/StoutLogic/acf-builder) :

#### Point

```php
$field
  ->addImage('my_image')
  ->addField('my_point_coords', 'acf_image_map', [
    'image_field_label' => 'my_image',
    'shape' => 'point',
    'percentage' => true,
  ]);
```

#### Polygon

```php
$field
  ->addImage('my_image')
  ->addField('my_poly_coords', 'acf_image_map', [
    'image_field_label' => 'my_image',
    'shape' => 'poly',
  ]);
```

### HTML

#### Point

For the point, you have the `x` and `y` coords.

Let's imagine that we have the fields defined above:

```php
$field
  ->addImage('my_image')
  ->addField('my_point_coords', 'acf_image_map', [
    'image_field_label' => 'my_image',
    'shape' => 'point',
    'percentage' => true,
  ]);
```

So we would have an HTML structure that would look like this to display our point on the image:

```php
$image = get_field('my_image');
$point = get_field('my_point_coords');
  
<div style="position: relative;">
  <img src="<?php echo $image['url']; ?>">
  <span style="
    position: absolute; 
    top: <?php echo $point['y']; ?>; 
    left: <?php echo $point['x']; ?>"
   ></span>
</div>
```

#### Poly

You use poly to create a map on the image a priori, so here is an HTML code to achieve this:

Let's imagine that we have the fields defined above:

```php
$field
  ->addImage('my_image')
  ->addField('my_poly_coords', 'acf_image_map', [
    'image_field_label' => 'my_image',
    'shape' => 'poly',
  ]);
```

So we would have an HTML structure that would look like this to display our area on the image:

```php
$image = get_field('my_image');
$poly = get_field('my_point_coords');
  
<div style="position: relative;">
  <img src="<?php echo $image['url']; ?>" usemap="#map">
  <map name="map">
    <area coords="<?php echo $poly['area_coord']; ?>" shape="poly"></area>
  </map>
</div>
```

Be careful, the coordinates of the area are defined in relation to the maximum size of the image. In responsive, this will not work, you have to recalculate the coordinates.

To do this automatically and easily, I recommend [this package](https://github.com/davidjbradshaw/image-map-resizer)


## Bug Reports

If you discover a bug in ACF Image Map, please [open an issue](https://github.com/Androlax2/acf-image-map/issues).

## Contributing

Contributing whether it be through PRs, reporting an issue, or suggesting an idea is encouraged and appreciated.

## License

ACF Image Map is provided under the [MIT License](https://github.com/Androlax2/acf-image-map/blob/master/LICENSE.md).
