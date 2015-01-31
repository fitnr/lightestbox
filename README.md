# Litebox

Create simple lightboxes to pop up images. Litebox has no dependencies and weighs in at only 3 kb.

Litebox plays well if your favorite browser module-builder, whether it's Browserify, Ender, whatver. It especially works will with DomReady.

## Boxing

Litebox plays of links, so let's say we have this html:

````html
<a id="foo" class="boxy" href="img1.png">Link 1</a>
<a id="bar" class="boxy" href="img2.png">Link 2</a>
<span id="baz" class="boxy" data-img="img3.png">Link 3</span>
````

Once Litebox and the DOM are loaded, we can run:

````js
var L = new litebox(document.getElementById('foo'));
L.attach(document.getElementById('bar')); // keep attaching elements
````

or:

````js
var elems = document.querySelectorAll('.boxy');
var L = new litebox();
for (var i; i < elems.length; i++) {
    L.attach(elems[i]);
}
````

But wait, you don't want to deal with all the getElementById junk. So run `ender add litebox domready qwery` and then you can do this:

````javascript
$.domReady(function(){
    $('.boxy').litebox();
});
````

Note that we're not limited to `<a>` tags. Setting a `data-img` attribute will let Litebox work nicely with most elements.

## Captions

Want your image to have a caption? Add a `title` attribute to your link, and that text will be your caption. Don't like the way the caption looks? Write some css - the selector is `.litebox-wrapper figcaption`.

Don't want your `title` attribute used that way? Read on:

## Options

Litebox is a purposefully minimal tool, but there are a few options:

* prefix: By default, the elements created have CSS classes with the prefix 'litebox'. Useful if you want multiple styles of lightboxes on a single page?
* maxWidth: The maximum width of the images.
* useTitle: When false, Litebox ignores the title element and looks for a `data-caption` attribute instead.

Pass arguments just like you would imagine:

````javascript
$('#foo').litebox({
    maxWidth: 600, // in pixels
    useTitle: false,
    prefix: 'special'
});
````

If you're using Litebox without ender, pass the options as the second argument when you create the Litebox object:

````javascript
L = new litebox(false, {useTitle: false});
// You'd probably loop through some elements here.
L.attach(document.getElementById('foo'));
````
