[![NPM Version](https://badge.fury.io/js/csscalc.svg?style=flat)](https://www.npmjs.com/package/csscalc)

# csscalc

JavaScript library to do math with css units.  
Fully typed with typescript.

Currently supported units: `px`, `cm`, `mm`, `Q`, `in`, `pc`, `pt`, `vh`, `vw`, `vmin`, `vmax`, `rem`, `%w`, `%h`.

* Convert between css units
* Calculate css expressions

Based on https://developer.mozilla.org/en-US/docs/Web/CSS/length

## Examples

Calculate what part of screen's width takes specified element:
```js
import { calc } from 'cssunits';

// %w means % of width
calc('100%w / 100vw', element);
```

Calculate area of element:
```js
calc('100%w * 100%h', element);
```

Convert pixels to percent of element's width:
```js
convert(100, 'px', '%w', calcCtx(element));
```

Convert element's width percent to pixels:
```js
convert(50, '%w', 'px', calcCtx(element));

// or

Relative["%w"](50, calcCtx(element));
```

## API

`Absolute` map, units -> pixels.  
```ts
Absoulte = {
    "absolute unit name" -> pixels
}
```

`Relative` map, (units, calcContext) -> pixels.  
```ts
Relative = {
    "relative unit name": (units: number, ctx?: CalcContext) => number
}
```

`UnitRegexpStr`, `UnitRegexp`, `UnitRegexpGM` - regular expression to find units.

Convert between units:
```ts
function convert(count: number, fromUnits: Unit, toUnits: Unit, calcCtx?: CalcContext): number;
```

Create calc context:
```ts
function calcCtx(el?: HTMLElement): CalcContext;
```

Calculate expression:
```ts
function calc(expression: string, el: HTMLElement, ctx?: CalcContext): number;
function calc(expression: string, ctx?: CalcContext): number;
```

## Roadmap

* Reactive calculations
