---
title: Everything You Need To Know About Encoding
author: Wen Zhu
date: '2017-12-21'
summary: Generally, there's no fundamental changes in ES6 in terms of `function` but a few minor improvements like parameters, introduction of arrow functions etc.
tags: CS
---

## What is encoding and why does it matter

```
I like programming.
```
What is this? Everyone understands that this is a sentence indicating I like writing code. This is from human's perspective, what about computers? Computers only know 0's and 1's. Everything stored or processed in computers are those 0, 1 sequence or `bytes` and each `byte` consists of 8 `bits` (0 and 1). Here comes the question, how do computers convert the sequence of characters into a sequence of `bytes`? This is `encoding`.

## Encoding schemes

### ASCII
In order to convert characters into bytes, the computer need a rule or a lookup table that could map a certain character into certain bytes. The rule or lookup table here is a `Encoding Scheme`. In English world, there are a total of 95 human readable characters, including numbers (0-9), letters(a-z, A-Z) and other non-alphanumeric characters, like ",", "=", "+", etc. It also has 33 other values like space, line break, etc, those are not *printable* per se, but still visible in some form and useful to humans. Therefore, there are a total of 128 characters in this `character set` or `charset`. 128 is not a big number in terms of `charset`, we can use 7 bits to fully represent this `charset`, or we need to use 1 byte. This is one of the famous encoding schemes called [`ASCII`](https://en.wikipedia.org/wiki/ASCII).

### Unicode

That's only English. What about other latin languages, let alone Chinese? There are tens of thousands of Chinese characters. `ASCII` has 1 byte for each character, so even we pick up the 8th bit, it could maximumly support 256 characters which is way less than needed. Therefore, there are other `encoding schemes`, for example, [Big-5](https://en.wikipedia.org/wiki/Big5) is a two-byte `encoding scheme`, it can support `2^16= 65536 ` distinct values and that could cover all traditional Chinese. [GB-18030](https://en.wikipedia.org/wiki/GB_18030) is another encoding scheme that could cover both traditional and simplified Chinese.

Still, question remains, what about other languages or `charset`? Can we find a universal encoding scheme to cover all existing characters? Yes, `Unicode` is the solution. However, `Unicode` has 3 variations: `UTF-8`, `UTF-16` and `UTF-32`. The table below gives a summary of definitions and differences among them. See below for their strategies.
 
- **UTF-8** variable-length encodings. If a character can be represented using a single byte (because its code point is a very small number), UTF-8 will encode it with a single byte. If it requires two bytes, it will use two bytes and so on. It has elaborate ways to use the highest bits in a byte to signal how many bytes a character consists of. This can save space, but may also waste space if these signal bits need to be used often.
- **UTF-16** variable-length encodings. UTF-16 uses at least two bytes, growing to up to four bytes as necessary.
- **UTF-32** always encodes to 4 bytes, simple but wastes a lot of space.

Note, `UTF-8` is binary compatible with `ASCII`, every `ASCII` consists of one byte, therefore for each character in `ASCII` charset, it has the same binary representation in `UTF-8`.


## Why went wrong

The key to encoding & decoding is that both ends need to stick to the same encode/decode scheme. If the decoder is using a different scheme as encoder uses, information will become garbled.

## Encoding and programming languages

We often hear the concept that 'XXX language natively support Unicode' or 'XXX language natively doesn't support Unicode'. For example, 'PHP doesn't support Unicode' and 'JavaScript natively supports Unicode'. What does that mean? Whenever we type something in text editor/IDE, it's already been decoded, either in some Unicode encoding scheme or some other one. So what on earth does it mean for a language to natively support or not support Unicode? It basically refers to whether a language assumes one character equals one byte or not. For example in PHP, it has such assumption.
```php
$string = "加油";
echo $string[0];
```
If we execute the php code above on some online editor, it will print an invalid character �, the reason is php will return first byte of `$string`, and the editor try to decode it with `UTF-8` scheme, however,  the first byte is not a valid `UTF-8` code.

For some other programming language like `JavaScript`, if we do similar thing, it will return the first character instead of first byte.
```javascript
const string = "加油";
console.log(string[0]); // "加"
```
The reason is very string in JavaScript is `UTF-16` encoded, with encoding scheme known to the parser, it will give the correct character when we manipulate the string.




## References
-  [What Every Programmer Absolutely, Positively Needs To Know About Encodings And Character Sets To Work With Text](http://kunststube.net/encoding/)
