# super-hearts
_Inspired by `super.me`_

**Question: Do you want to spew hearts everywhere?**

Well, fine person, you are in luck! 

## Quick Start (the defibrillator)
Give us a selector, and we'll make sure your `click` and `touchend` events are full of happy, happy joy.

```javascript
var options = {},
    selector = "#myThingIWantToSpewHeartsWhenClicked";

SuperHearts(selector, options);
```

## options
_Eff yeah configuration!_

Wait. Are you not into configuration? That's okay! All options have defaults.

_Eff yeah defaults!_


### angleRange
Default is `[0, 360]`

Array of length 2

Determines the (inclusive) range of angles that is used to randomly rotate hearts.


### blastRange
Default is `[65, 90]`.

Array of length 2

How far (in px) a heart is translated from the original click.


### fanHearts
Default is `false`.

Bool

If true, hearts are spewed in a circular, fanning pattern.


### floatingInSpace
Default is `false`.

Bool

Affects how hearts are oriented when they are translated. 
When `false`, all hearts appear to "shoot out" from the click/touch point. 
When `true`, the hearts' orientation is a little more scattered, like they were thrown lazily by a small child.


### heartsCount
Default is `[6, 10]`

Array of length 2

The number of hearts that are spewed on a given touch/click is random.
`heartsCount` determines the (inclusive) range from which said random number of hearts is chosen.


### imageSrc
Defaults to an inlined SVG heart icon.

String

Path to an image that you want to spew (preferably a heart). 


### opacityRange
Default is `[0.10, 0.75]`

Array of length 2

Hearts are given random opacity from `opacityRange[0]` to `opacityRange[1]`. You may only specify scalars to a hundredth.


### rotateHearts
Default is `true`.

Bool

If `false`, hearts are not rotated, and the original click/touch point becomes a geyser of hearts.


### scalarRange
Default is `[0.50, 2.00]`

Array of length 2

Hearts are randomly scaled in size from `scalarRange[0]` to `scalarRange[1]`. You may only specify scalars to a hundredth.


### transformOrigin
Default is `"center center"`

String


### transitionDuration
Default is `400` (ms).

Number

`SuperHearts` only supports milliseconds for now. **Make sure to pass a number**, as this parameter is also used in a call to `setTimeout`. (Dude, I know. I'm sorry.)


### transitionFunction
Default is `"ease-out"`.

String


## TODO
* Write the TODO


## If you want to contribute
Tell me! Let's talk!