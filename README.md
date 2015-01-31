# Litebox

Create simple lightboxes to pop up images. Litebox is library-agnostic, has no dependencies and weighs in at only 3 kb.

Use it with jQuery, Zepto or Ender; or compile it in with Browserify and your favorite tools.

## Boxing

First off, you'll need to include the CSS and JS:

````html
<link rel="stylesheet" href="litebox.min.css">
<link rel="stylesheet" href="litebox.min.js">
````

Let's say we have this html:

````html
<a id="foo" class="boxy" href="img1.png">Link 1</a>
<a id="bar" class="boxy" href="img2.png">Link 2</a>
<span id="baz" class="boxy" data-img="img3.png">Link 3</span>
````

Once Litebox and the DOM are loaded, we can run:

````js
var L = new litebox(document.getElementById('foo'));
L.add(document.getElementById('bar'));
L.add(document.getElementById('baz')); // a loop would work, too
````

Note that we're not limited to `<a>` tags. Setting a `data-img` attribute will let Litebox work nicely with most elements.

## Libraries

But wait, you probably don't want to deal with all that getElementById junk. If you're running Zepto or jQuery, just include the appropriate `litebox.*.min.js` file and you can do this:

````javascript
<link rel="stylesheet" href="litebox.jquery.min.js">
<script>
$(document).ready(function(){
    $('.boxy').litebox();    
});
</script>
````

Note that you don't have to include `litebox.min.js` if you're using the jQuery or Zepto modules. You will need the CSS, though.

Run `ender add litebox` and you can do the same thing (assuming you have a selection engine running).

## Captions

Want your image to have a caption? Add a `title` attribute to your link, and that text will be your caption. Don't like the way the caption looks? Write some CSS - the selector is `.litebox-wrapper figcaption`.

Don't want your `title` attribute used that way? Read on!

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

If you're using Litebox without a library, pass the options as the second argument when you create the Litebox object:

````javascript
var L = new litebox(false, {useTitle: false});
L.add(elem);
````

## Display style

Litebox comes with a bare-bones style for the pop-ups, with the expectation is that developers will customize it. For reference, here are the elements it adds to the DOM:

````html
<div class="litebox-wrapper" style="width: <dynamic>; height: <dynamic>;">
<!-- litebox-wrapper dynamically expands fit the window -->
    <div class="litebox-loading" style="display: block;">
    <!-- by default, litebox-loading has a simple css animation. Grab another one or add a animated gif background-image -->
        <div>Loading...</div>
    </div>
    <figure style="display: block; width: <dynamic>; height: <dynamic>;">
        <img src="img.png">
        <figcaption>Caption</figcaption>
    </figure>
</div>
````
