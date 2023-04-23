---
title: CSS Grid Layout
author: Wen Zhu
date: '2018-01-29'
summary: CSS Grid Layout is a powerful grid system introduced to support both rows and columns. Similarly to Flexbox, it also has the concept of container element and children elements.
tags: CSS
---

## Introduction

There have been several attempts in CSS area to tackle layout problem: Table, float, inline-block, etc. All of them are essentially hacks and left out a lot of a lot of important functionality like vertical centering. [Flexbox](http://zhuwen.me/blog/2017/8/flexbox) came out and helped a lot. However flexbox is a 1-dimensional grid system and doesn't work quite well for complex two-dimensional layout. 

CSS Grid Layout is a powerful grid system introduced to support both rows and columns. Similarly to Flexbox, it also has the concept of container element and children elements.

Until now, most major browsers have natively supported grid syntax, check detailed [Browser Support](https://caniuse.com/#search=grid) in [caniuse.com](https://caniuse.com).

Note:
Credit of most of the examples & images in this blog goes to [CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid).

## Concept & Terminology

Grid Layout has container element and children elements. There are a set of css attributes for them respectively.

### Grid Container

#### display: grid | inline-grid | subgrid;
- **grid**: generates a block level grid.
- **inline-grid**: generates a inline-block level grid.
- **subgrid**:  if this grid itself is a grid item, you can use this property to indicate that this grid will use the size of rows and columns from its parent instead of specifying its own.

#### grid-template-rows & grid-template-columns
Those two properties are used to specify the rows and columns with space-separated list of values. The values represent the track size (cell size) and the space between them represents the grid line. There are quite a lot of more details for the properties, you can check [this css-tricks blog](https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13).

An example:
```css
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```
![grid-template-columns & grid-template-rows](https://cdn.css-tricks.com/wp-content/uploads/2016/03/grid-numbers.png)

#### grid-template-areas
This property defines the grid template by referencing the grid areas defined by `grid-area` property on grid items. By repeating the area name will span the area to multiple tracks/cells. A period means an empty cell.

An example:
```css
.item-a {
  grid-area: header;
}

.item-b {
  grid-area: main;
}

.item-c {
  grid-area: sidebar;
}

.item-d {
  grid-area: footer;
}

.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-area:
    "header header header header"
    "main main . sidebar"
   "footer footer footer footer"\t
}
```
![](https://cdn.css-tricks.com/wp-content/uploads/2016/03/grid-template-areas.png)

### Grid Items

#### grid-column-start, grid-column-end, grid-row-start, grid-row-end
Those 4 properties are used to specify item location by referencing to grid lines.

An example:
```css
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
```

![grid-start-end-a.png](https://cdn.css-tricks.com/wp-content/uploads/2016/03/grid-start-end-a.png)

`grid-column` and `grid-row` are shorthand for the 4 properties.

#### grid-area
Gives an item an name so that it can be referenced by a template with [grid-template-areas](#grid-template-areas) property.

There are quite a few other properties, you can check [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) or [CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/).

## Examples

We will try to use Grid Layout technique to create a out blog layout style.

<iframe width="100%" height="300" src="//jsfiddle.net/coderwz/o7440kwx/embedded/html,css,result/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## References
- [CSS tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN: CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)