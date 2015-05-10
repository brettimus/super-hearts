# super-hearts
**Question: Do you want to spew hearts everywhere?**

Well, fine person, you are in luck! 

## usage
Give us a selector, and we'll make sure your `click` and `touchend` events are full of happy, happy joy.

```javascript
var selector = "#myThingIWantToSpewHeartsWhenClicked"
SuperHearts(selector, options);
```

## options
_Eff yeah configuration!_

Wait. Are you not into configuration? That's okay! All options have defaults.

_Eff yeah defaults!_


### blastRange
Default is `[60, 80]`.

Array of length 2

How far (in px) a heart is translated from the original click.


### fanHearts
Default is `false`.

Bool

If true, hearts are animated in a circular, fanning pattern around the click/touch.

### floatingInSpace
Default is `false`.

Bool

Affects how hearts are oriented when they are translated. 
When `false`, all hearts appear to "shoot out" from the click/touch point. 
When `true`, the hearts' orientation is a little more scattered, like they were thrown lazily by a small child.

### heartDelay
Default is 0.

Number

The amount of time (in ms) to delay between spewing each heart on a given heart-spew.


### heartsCount
Default is `[18, 22]`

Array of length 2

The number of hearts that are spewed on a given touch/click is random.
`heartsCount` determines the (inclusive) range from which said random number of hearts is chosen.


### imageSrc
Defaults to an inlined SVG heart icon.

String

Path to an image that you want to spew (preferably a heart). 


### opacityRange
Default is `[0.10, 1.00]`

Array of length 2

Hearts are given random opacity from `opacityRange[0]` to `opacityRange[1]`. You may only specify scalars to a hundredth.


### rotateHearts
Default is `true`.

Don't mess with this option yet...


### scalarRange
Default is `[0.50, 2.00]`

Array of length 2

Hearts are randomly scaled in size from `scalarRange[0]` to `scalarRange[1]`. You may only specify scalars to a hundredth.


### transformOrigin
Default is `"center center"`


### transitionDuration
Default is `300` (ms).

Number.

`SuperHearts` only supports milliseconds for now. **Make sure to pass a number**, as this parameter is also used in a call to `setTimeout`. (Dude, I know. I'm sorry.)


### transitionFunction
Default is `ease-out`.


## TODO
* Remove things that I'm doing that are probably dumb
* 


## If you want to contribute
Tell me! Let's talk! I want helps.