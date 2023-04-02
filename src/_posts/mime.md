---
title: MIME
author: Wen Zhu
date: '2017-12-09'
summary: An introduction of MIME types used in HTTP headers and explanation of several important MIME types for web developers.
tags: "Web,HTTP"
---

# MIME

## What is MIME
`Multipurpose Internet Mail Extensions (MIME)` is an internet standard created to extend the format of email to support many others in addition to just ASCII text, originally it was only used in `SMTP` protocol and later on it was extended to support `HTTP`. MIME type is a meta data set in HTTP request/response header indicating the type of the content. Servers/clients will use this formation to process corresponding content, for example, if the response MIME type is `video/ogg`, then the browsers can play the video in the browser. In absence of MIME type in the header, browsers will guess the MIME type by looking at the actual content. This is called `MIME sniffing`. However, different browsers on different platforms may behave differently and there's also security concerns if the content is executable. Note, server can disable MIME sniffing by sending a `X-Content-Type-Options` along with `Content-Type`.

## Format

MIME types are in `type/subtype` format. `type` indicates a general category like `text`, `image`, `audio`, `application`, `multipart`, etc. `subtype` gives more specific information, for example, under `text` category, there are `plain`, `document`, `css`, etc.

## MIME for Web Developers

There are many types of MIME types and some of them are particular important to web developers.

### application/octet-stream

`application` represents a binary file type and `application/octet-stream` is the default MIME type for binary file, browsers will treat it as a *Unknown* type and show a download window prompting the user to save it locally.

### text/plain

`text/plain` represents plain text, browsers will display them directly.

### text/html

`text/html` is the type for web pages, a.k.a, document. With this type set, browser will know this is a document and it will parse it and do further processing, like retrieve static files, render style, etc.

### application/json

`application/json` is the MIME type to exchange `JSON` text. It is often used in `XmlHttpRequest` requests.

### application/x-www-form-urlencoded

`application/x-www-form-urlencoded` is a MIME type used in HTTP POST request. With this MIME type set, browsers will encode the form data (key/value pairs) into a query string: *keyOne=valueOne&keyTwo=ValueTwo*. Server will know how to extract the key/value pairs from the query string. For any non-alphanumeric characters, it will be replaced by *%HH*, each *H* here is a hexadecimal digit representing the ASCII code of the character.

### multipart/form-data

`multipart/form-data` is another MIME type used in HTTP POST requests. `multipart` category means the data consists of multiple parts/MIME types.  Those different parts are delimited by a boundary (a string started with a double dash '--') and each part is an entity by itself, with its own HTTP headers. For details, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#Important_MIME_types_for_Web_developers).

### application/x-www-form-urlencoded vs multipart/form-data

`application/x-www-form-urlencoded` and `multipart/form-data` are the only two MIME types used by HTML form POST, however what are the differences between them and when should we use which?

**TL;DR**

We should use `multipart/form-data` if there's any binary data in the form data, otherwise, use `application/x-www-form-urlencoded`.

As mentioned above, browsers will replace a non-alphanumeric character with 3 characters which will triple the size of the data. With large binary file in form data, tripling the data size will be dramatically inefficient, thus using `multipart/form-data` will be a better choice. Vice versa, if the form data are small size, using `multipart/form-data` will introduce much larger overhead (Boundary string).

Another interesting note when using `multipart/form-data` is the boundary string chosen. The boundary string must be unique from data value, otherwise servers will pick the delimiters in the wrong places.  [This answer from StackOver](https://stackoverflow.com/a/23152871) provides an interesting option.

## References

1. [MIME types - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
1. [StackOverflow: application/x-www-form-urlencoded vs multipart/form-data](https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data)
1. [MIME - Wikipedia](https://en.wikipedia.org/wiki/MIME)
1. [RFC 2045](https://tools.ietf.org/html/rfc2045)