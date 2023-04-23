---
title: Flexbox
author: Wen Zhu
date: '2017-08-17'
summary: CSS layout is a fundamental part of web development, for a very long time, "floating" and "positioning" are the only techniques we can use to solve this problem. However, "floating" and "positioning" are always a headache to front end developer, It is time to embrace Flexbox!
tags: JavaScript
---

## Why Flexbox?

CSS layout is a fundamental part of web development, for a very long time, `floating` and `positioning` are the only techniques we can use to solve this problem. Due to the "special" behavior of `float`, we need to always keep the ""clear the float" in mind. Let along there are some use cases that we cannot or very difficult to solve it with the `floating` and `positioning` techniques. For example:
 - Center the content vertically in a container div.
 - For multi-column layout, keep all columns with different content in same height.
 - Nicely distribute the items in multiple lines without writing multiple media queries.
 - Specify the order of elements without touching the dom order.
 - etc...

Flexbox technique can solve all those problems easily! Currently all major browsers have supported it, therefore there's no reason not to embrace flexbox!
 
## Flex model

Similarly to box model, flexbox has a "flex model": "flex container" and "flex item". We can visualize the model from the following diagram:
<div>
<img src="https://mdn.mozillademos.org/files/3739/flex_terms.png" alt='flex_term.png'></div>

Instead of width and height, flexbox introduced the concepts of `main axis` and `cross axis`. `main axis` is the direction that the flex items are laid out (`main start` -> `main end`) and `cross axis` (`cross start` -> `cross end`) is perpendicular to the `main axis`. Along with those two concepts.

## Flex properties

### For flex container

 - **display**: flex or inline-flex, to indicate the flex container should be a block-level or inline-level element.
 - **flex-direction**: row, column, row-reverse, column-reverse, to indicate the direction of flex items.
 - **flex-wrap**: wrap, nowrap
 - **flex-flow**: shorthand for flex-direction,flex-wrap
 - **justify-content**: center, left, right, flex-start, flex-end, space-around, stretch, etc. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) for details. Adjust space along main axis.
 - **align-items**: Similar to 'justify-content' but apply to cross axis.

### For flex item

 - **flex-basis**: \\<width> this flex item's basic length in the flex direction.
 - **flex-grow**: \\<number> If combined flex items size is smaller than flex container size, then remaining size will be shared by all flex items by their flex-grow factor proportionally.
 - **flex-shrink**: \\<number> If combined flex items size is larger than flex container size, all flex items will be shrunk to fit the container by their flex-shrink factor proportionally.
 - **flex**: shorthand for flex-grow,flex-shrink,flex-basis, see this [example](https://css-tricks.com/almanac/properties/f/flex-shrink/) for better understanding.
 - **align-self**: override 'align-items' for a single item. Note: If any of the item's cross-axis margin is set to auto, then align-self is ignored.
 - **order**: \\<number> by default, all flex items have the default order value 0.
 
## Examples & Use cases

Examples here are shamelessly stolen from [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes).

### Multi-Column layout (different width)

<iframe width="100%" height="300" src="//jsfiddle.net/coderwz/qo3w4hq7/1/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
In this example, we set the all three article flex-basis to be 0, and flxe-grow to be 1, 1, 2 respective, then 3rd article will be twice  as wide as the first two.

### Responsive Enough

We don't have to set multiple break points for media query to achieve this.
<iframe width="100%" height="300" src="//jsfiddle.net/coderwz/tcdh47hw/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Order the items

We can use the `order` attribute to specify the order.
<iframe width="100%" height="300" src="//jsfiddle.net/coderwz/nue8ntra/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Nested flex boxes

<iframe width="100%" height="300" src="//jsfiddle.net/spoiledPiggy/jh1scbpL/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## References

 - [Flexbox, MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
 - [Using CSS Flexible Boxes,  MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
