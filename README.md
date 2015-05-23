# super-hearts
_Inspired by `super.me`_

**Question: Do you want to spew hearts everywhere?**

Well, fine person, you are in luck! 

## Quick Start (a.k.a The Defibrillator)
Give us a selector, and we'll make sure your `click` and `touchend` events are full of happy, happy joy.

```javascript
var dawh = SuperHearts(); // now try clicking around
```

## Presets
A `preset` is a helper function with a set of default options for a given call to `SuperHearts`. 
You call a `preset` on the main `SuperHearts` object.

`SuperHearts` comes with a few presets out of the box, 
but you can also register your own (see below).


### Circle
**Evented**

`Circle` is the primary default. 
That is, calling `SuperHearts("#my-element")` is the same as `SuperHearts.Circle("#my-element")`.
```javascript
// Hearts radiate in a ring pattern around a user's click or touch
var circ = SuperHearts.Circle(); // note: this is equivalent to calling `SuperHearts()`
```

### Line
**Evented**
```javascript
// Hearts float upwards and horizontally from the user's click or touch
var line = SuperHearts.Line();
```

### Geyser
**Continuous**
```javascript
// Hearts continuously spew from a fixed point
var line = SuperHearts.Geyser();
```

### Button
**Evented**

The `Button` preset is good for attaching an animation to an interactive element.
Animations on the specified element will start from a fixed point, 
which is calculated as the "center of mass" of the element's `boundingRect`.

```javascript
// Fixed starting point determined by `boundingRect` of `#myButton`.
var butt = SuperHearts.Button("#myButton");
```

### Add your own
To add your own preset to the `SuperHearts` object, 
use the `SuperHearts.registerPreset` method. 
This method takes a `name` parameter and an options hash.

```javascript
// Register a `preset` called `Foo`
var fooConfig = { /* put your desired settings here */ }
SuperHearts.registerPreset("Foo", fooConfig);
// Now you can call
SuperHearts.Foo("#my-element");
```

The defaults that you assign to a `preset` 
can be easily overriden in subsequent calls to your `preset`, as follows:

```javascript
var newFooConfig = { /* Override some defaults that you previously set on Foo */ };
SuperHearts.Foo("#my-element", newFooConfig);
```


## Options
_Eff yeah configuration!_

Wait. Are you not into configuration? That's okay! All options have defaults.

_Eff yeah defaults!_

Note that defaults depend on the preset configuration (duh). 
For now, all of the defaults below refer to the `Circle` preset's default.


### angle
`Array` of length 2 **or** `Number`

Determines the (inclusive) range of angles (measured in degrees) that is used to randomly rotate hearts. You may specify a range outside of `[0, 360]`. 

If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.

Default is `[0, 359]` (deg)


### blur
`Number`

_Work in progress._ 
Modifies the `stdDeviation` of an `<feGaussianBlur>` filter on the default SVG heart.

Default is `0`


### color
`String`

Sets the fill for the default heart icon. (Should _hopefully_ do nothing if you configure your own image.)

Default is `"#B91319"`.


### count
`Array` of length 2 **or** `Number`.

Default is `[6, 10]`


The number of hearts that are spewed on a given touch/click is random.
Determines the (inclusive) range from which said random number of hearts is chosen. 
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.


### doNotRemove
`Boolean`

If true, image elemnts will stay on the page indefinitely;

Default is `false`


### fan
`Boolean`

If true, heart animations are staggered, which lends itself to a fanning pattern.

Default is `false`.


### geyser
`Boolean`

When `true`, creates a continuous stream of hearts. 
Starting coordinates are calculated based off of the targeted element's `boundingRect`.

Default is `false`

**Note:** turning on `geyser` means that `click` and `touch` events are not attached to the target element.
_This could use a lot of work if you want to help!_


### geyserInterval
`Number`

Sets how often hearts are spewed from the geyser. **`0` is ignored**

Default is `transitionDuration/2` (ms)


### imageHeight
`Number`

If truthy, this number will be set directly on the animated image elements as their height (in `px`).

Default is `undefined`.


### imageSrc
`String`

Path to an image that you want to spew (preferably a heart). 

Defaults to an SVG heart icon that is stored as a string in the source code.


### imageWidth
`Number`

If truthy, this number will be set directly on the animated image elements as their width (in `px`).

Default is `undefined`.


### opacity
`Array` of length 2 **or** `Number`.

Hearts are given random opacity from `opacityRange[0]` to `opacityRange[1]`. You may only specify scalars to a hundredth. 
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.

Default is `[0.10, 0.75]`


### rotate
`Boolean`

If `false`, hearts are not rotated, and the original click/touch point becomes a geyser of hearts.

Default is `true`.


### scalar
`Array` of length 2 **or** `Number`.

Hearts are randomly scaled in size from `scalarRange[0]` to `scalarRange[1]`. 
You may only specify scalars to a hundredth. 
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.

Default is `[0.10, 0.45]`


### transformOrigin
`String`

Sets the `transform-origin` property of images.

Default is `"center center"`


### transitionDuration
`Number`

`SuperHearts` only supports milliseconds for now. 
**Make sure to pass a number**, as this parameter is also used in a call to `setTimeout`. 
(I know. I'm sorry.)

Default is `400` (ms).


### transitionFunction
`String`

Sets the function used in the `transition` property of images.

Default is `"ease-out"`.


### translateX
`Array` of length 2 **or** `Number`.


How far (in px) a heart is translated along the x-axis from the original click. 
I think in cartesian coordinates, so treat this as a cartesian translation (not that it makes a difference in this case).
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.

_Not affected by `scalar`._

Default is `[0,0]`.


### translateY
`Array` of length 2 **or** `Number`.

How far (in px) a heart is translated along the y-axis from the original click. I think in cartesian coordinates, so treat this as a cartesian translation.

_Not affected by `scalar`._

Default is `[65, 90]`.


### xNoise
`Array` of length 2 **or** `Number`.

Random noise added to the initial `x` coordinate of an image.

Default is `0`.


### yNoise
`Array` of length 2 **or** `Number`.

Random noise added to the initial `x` coordinate of an image.

Default is `0`.


## Points of Pride
* Use of `window.requestAnimationFrame` ([What's that?](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/))


## TODO
* Write Tests (ha)
* Switch to using [jsdoc](http://usejsdoc.org/) after refactoring prototypes + factories
* Change main default to be either incredibly basic or moar like Super's
* `SuperHearts.registerDefault` method
* Allow presets to be a composition of several configs
* Allow mass assignment (use `document.querySelectorAll` instead of `document.querySelector`)
* Refactor logic around `doNotRemove` option
* Fix caching issue -- inlined heart icon uses a `data:` URL for its source, **SO IT IS NOT CACHED**
* Refactor SVG manipulation
* Add more SVG manipulation
* Draw hidden SVG image on the page and use a relative URL as an image source (_getting close_)
* Publish to NPM
* PROFIT

## If you want to contribute
I only accept pull requests in writing.