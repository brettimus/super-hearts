# hello today!

what a fine day today is.

**question for you now!** 

do you want to spew hearts or other images of your choosing everywhere all over the place on your internet website?

you are in luck, lucky person! 

## quick start (a.k.a the defibrillator HA!)
give me selector (or not!!!), and i make sure your `click` and `touchend` events are full of happy happy joy.

```javascript
var dawh = SuperHearts(); // now click!!!
```

# Here is Some More Involved Documentation
sorry, lucky person, but these docs are not so great now! you still hopefully use my hearts though.

## Presets
A `preset` is a helper function with a set of default options for a given call to `SuperHearts`. 
You call a `preset` on the main `SuperHearts` object.

`SuperHearts` comes with a few presets out of the box, 
but you can also register your own (see below).


### BigRing
**Evented**

`BigRing` shoots out a large concentric band of hearts. Yay! 
It is a composition of 18 different option configurations, 
but we'll get to that whole song and dance (configuration) in two shakes... 
Just sit tight, buddy.
```javascript
  // Hearts radiate in a large concentric band from the click or touch point.
  var biggie = SuperHearts.BigRing();
```

### Circle
**Evented**

`Circle` is the primary default. 
That is, calling `SuperHearts("#my-element")` is the same as `SuperHearts.Circle("#my-element")`.
```javascript
// Hearts radiate in a lackadaisical ring pattern around a user's click or touch
var circ = SuperHearts.Circle(); // note: this is equivalent to calling `SuperHearts()`
```

### Compass
**Evented**

`Compass` is a composition of four animations. The current implementation of a composed preset (a preset that combines multple separate animation configurations on the same event) makes further composition a little difficult because I hacked it together without thinking much about how you'... Ah. I just realized how to fix this! Apply every new call's new options to _all_ of the preset animation configs individually. If you find this note I forgot to delete it. Please submit an issue.
```javascript
// Four hearts shoot out from the four compass direction of the click/touch point )North, East, South, and West).
var compass = SuperHearts.Compass();
```

### Line
**Evented**
```javascript
// Hearts float upwards and horizontally from the user's click or touch
var line = SuperHearts.Line();
```

### Geyser
// Removed. Should be written as a plugin.

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
This method takes a `name` parameter && ( an options hash || an array of options hashes ).
Passing an array of options hashes to registerPreset means they will be treated as a single configuration in any future operations. Long sentence, sorry.

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
_:tada: configuration!_

Wait. Are you not into configuration? That's okay! All options have defaults.

_:confetti_ball: yeah defaults!_

Note that defaults depend on the preset configuration (duh, right?), meaning 
**all of the defaults below refer to the `Circle` preset's default**.

:broken_heart: means an option is a little **off-beat**. :joy_cat:

:warning: means an option's name will probably change. Or it might become a :ghost:. Or a :bug:.


### :broken_heart: blur
`Number`

_Work in progress._ 
Modifies the `stdDeviation` of an `<feGaussianBlur>` filter on the **default** SVG heart icon.

Default is `0`


### color
`String`

Sets the fill for the default heart icon. (Should _hopefully_ do nothing if you configure your own image.)

Default is `"#B91319"`.


### count
Range

Default is `[6, 10]`


The number of hearts that are spewed on a given touch/click is random.
Determines the (inclusive) range from which said random number of hearts is chosen. 
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.


### :warning: doNotRemove
`Boolean`

If true, image elemnts will stay on the page indefinitely;

Default is `false`


### :skull: imageAppendedTo
`String`

Selector of element to which we should append `img`s.


### :skull: imageClass
`String`

If provided, the given class name is added to each image element.


### imageHeight :skull: (not set on image currently)
`Number`

If truthy, this number will be set directly on the animated image elements as their height (in `px`).

Default is `undefined`.


### imageSrc
`String`

Path to an image that you want to spew (preferably a heart). 

Defaults to an SVG heart icon that is stored as a string in the source code.


### imageWidth :skull: (not set on image currently)
`Number`

If truthy, this number will be set directly on the animated image elements as their width (in `px`).

Default is `undefined`.


### opacity
Range

Hearts are given random opacity from `opacityRange[0]` to `opacityRange[1]`. You may only specify scalars to a hundredth. 
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.

Default is `[0.10, 0.75]`


### rotate
Range

Determines the (inclusive) range of angles (measured in degrees) that is used to randomly rotate hearts. You may specify a range outside of `[0, 360]`. 

If you only supply a `Number` (call it `n`), it is treated as `[n,n]`. It will always be `n`. Forever.

Default is `[0, 359]` (deg)


### scalar
RangeHundredth

You may only specify scalars to a hundredth. 

Default is `[0.10, 0.45]`


### transformOrigin
`String`

Sets the `transform-origin` property of images.

Default is `"center center"`


### transitionDuration
Range

`SuperHearts` only supports milliseconds for now. 

Default is `400` (ms).


### transitionFunction
`String`

Sets the function used in the `transition` property of images.

Default is `"ease-out"`.


### translateX
Range

How far (in px) a heart is translated along the x-axis from the original click. 
If you only supply a `Number` (call it `n`), it is implicitly converted to `[n,n]`.

_Not affected by `scalar`._

Default is `[0,0]`.


### translateY
Range

How far (in px) a heart is translated along the y-axis from the original click. I think in cartesian coordinates, so treat this as a cartesian translation.

_Not affected by `scalar`._

Default is `[65, 90]`.


### translateZ
Range

How far (in px) a heart is translated along the z-axis from the original click. 

_Not affected by `scalar`._

Default is `[0, 0]`.


### xNoise
Range

Random noise added to the initial `x` coordinate of an image.

Default is `0`.


### yNoise
Range

Random noise added to the initial `x` coordinate of an image.

Default is `0`.


## Vision for V1

A more descriptive and fluid interface for constructing animations. E.g.,
```javascript
var hehe = SuperHearts(selector, {/* config */}); // => returns an unanimated SuperHearts object
// Each method call sets a property on the config
// Each image property should return its corresponding style rules
// These rules get held in a fifo queue
// #transition 
hehe.count()
      .x(...) // standard input- Range or number
      .y(...)
      .rotate(...)
      .scale(...)
      .transition(...)
      .translate(...)
```
// A Range should be formally abstracted.
// It should be a constructor that takes a number, array of length 2, or an object with a `data` property and `sample` function. 


## TODO
* Write Tests 
* Switch to using [jsdoc](http://usejsdoc.org/) after refactoring prototypes + factories 
* Change main default to be for attaching to buttons
* Fix `SuperHearts.registerDefault` method
* Fix caching issue -- inlined heart icon uses a `data:` URL for its source, **SO IT IS NOT CACHED**
* Add more SVG manipulation
* Try to draw hidden SVG image on the page and use a relative URL as an image source
* PROFIT

## If you want to contribute
I only accept pull requests in writing.