# super-hearts
Question: Do you want to spew hearts everywhere?

Well, you are in luck! 

## usage
Give us a selector, and we'll make sure your `click` and `touchend` events are full of happy joy.

```javascript
var selector = "#myThingIWantToSpewHeartsWhenClicked"
SuperHearts(selector, options);
```

## options
Eff yeah configuration!

### blastRange
Default is `[60, 80]`.

Array of length 2

How far (in px) a heart is translated from the original click.


### heartsCount
Default is `[15, 22]`

Array of length 2

The number of hearts that are spewed on a given touch/click is random.
`heartsCount` determines the (inclusive) range from which said random number of hearts is chosen.


### imageSrc
Default is `./heart.png`. 

String with path to an image. 
(This default will probably change.)


### scalarRange
Default is `[0.2, 1.2]`

Array of length 2

Hearts are randomly scaled in size from `scalarRange[0]` to `scalarRange[1]`. You may only specify scalars to a tenth.


### transformOrigin
Default is `"center center"`


### transitionDuration
Default is `300` (ms).

Number.

`SuperHearts` only supports milliseconds for now. **Make sure to pass a number**, as this parameter is also used in a call to `setTimeout`. (Dude, I know. I'm sorry.)


### transitionFunction
Default is `ease-out`.