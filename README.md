# Litebox

Create simple lightboxes to pop up images. Litebox has no dependencies and weighs in at only 3 kb.

Litebox is also an ender-ready module, and plays well with domReady.

## Boxing

Litebox plays of links, so let's say we have this html:

````html
<a id="foo" href="image.png">Link</a>
<a id="bar" href="image.png">Link</a>
````

Once Litebox and the DOM are loaded, we can run:

````js
var L = new litebox(document.getElementById('foo'));
L.attach(document.getElementById('bar')); // keep attaching elements
````

But wait, you don't want to deal with all the getElementById junk. So run `ender add litebox domready` and then you can do this:

````javascript
$.domReady(function(){
    $('.foo').litebox();
});
````

This is pretty easy, here's another example showing how Litebox isn't limited to working on `<a>` tags. Set a `data-img` attribute :

````html
<div id="foo" data-img="image.png">div div div</div>

<script>
$.domReady(function(){
    $('.foo').litebox();
});
</script>
````

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
$('.foo').litebox({
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
