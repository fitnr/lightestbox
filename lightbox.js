/*!
  http://github.com/fitnr/litebox
  Adapted from:
  Lightbox JS: Fullsize Image Overlays
  original author: Lokesh Dhakar, 2005-2006
  http://huddletogether.com/projects/lightbox/
  license: Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
*/
!function (name, definition) {

  if (typeof module != 'undefined')
    module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object')
    define(definition);
  else
    this[name] = definition();

}('lightbox', function() {
  var doc = window.document;

  function listenEsc(event) {
    if (event.key === 27)
      hideLightbox();
  }

    function Lightbox(opts) {
        var defaults = {
            namespace: 'lightbox',
            maxWidth: Infinity,
            useTitle: true
        };
        
        this.options = (typeof opts === 'object') ? opts : {};

        for (var property in defaults) {
            if (defaults.hasOwnProperty(property) && !this.options.hasOwnProperty(property))
                this.options[property] = defaults[property];
        }

        this._wrapper = null;
        this._figure = null;
        this.captionheight = 0;
    }

    Lightbox.prototype.setFigureDims = function(img) {
        var w = img.width, h = img.height;
        this.figure.style.width = (w < options.MaxWidth) ? w : options.MaxWidth;
        this.figure.style.height = ((w < options.MaxWidth) ? h : options.MaxWidth / w * h) + this.captionHeight;
    };

    Lightbox.prototype.wrapper = function() {
        return this._wrapper || this.create();
    };

    Lightbox.prototype.figure = function() {
        return this._figure || this.wrapper().getElementsByTagName('figure').item(0);
    };

    // Preloads images. Pleaces new image in lightbox then centers and displays.
    Lightbox.prototype.show = function(elem) {
        // prep objects
        var wrapper = this.wrapper(),
            figure = this.figure(),
            loading = wrapper.getElementsByTagName('div').item(0),
            caption = wrapper.getElementsByTagName('figcaption').item(0);

        // show wrapper and loading css, hide figure
        figure.style.display = 'none';
        wrapper.style.display = loading.style.display = 'block';

        var captiontext = (this.options.useTitle) ? elem.getAttribute('title') : elem.dataset.caption;
 
        if (captiontext) {
            caption.style.display = 'block';
            caption.innerText = elem.getAttribute('title');
            this.captionHeight = getComputedStyle(wrapper.height.replace('px', ''));
        } else {
            caption.style.display = 'none';
            this.captionHeight = 0;
        }

        // create image
        var img = doc.createElement('img');

        img.addEventListener('load', this.setFigureDims);
        img.addEventListener('load', function(){
            this.figure.style.display = 'block';
        });

        wrapper.getElementsByTagName('figure').item(0).insertBefore(img, caption);

        img.src = elem.href;

        // Check for 'esc' keypress
        doc.addEventListener('keypress', listenEsc);
    };

    Lightbox.prototype.hide = function() {
        this.wrapper.style.display = 'none';
        this.wrapper.removeChild(this.wrapper.getElementsByTagName('img').item(0));
        doc.removeEventListener('keypress', listenEsc);
    };

  // elements created:
  // <div class="lightbox-overlay">
  //   <div class="lightbox-loading"><div>Loading</div></div>
  //   <figure>
  //     <img src="{ a.href }" />
  //     <figcaption>{ a.title }</figcaption>
  //   </figure>
  // </div>
    Lightbox.prototype.create = function() {
        this._wrapper = doc.createElement("div");
        this._wrapper.className = options.namespace + '-overlay';
        this._wrapper.addEventListener('click', hideLightbox);
        this._wrapper.style.width = window.innerWidth + 'px';
        this._wrapper.style.height = window.innerHeight + 'px';
        doc.body.insertBefore(this._wrapper, doc.body.firstChild);

        var loading = doc.createElement('div');
        loading.className = options.namespace + '-loading';

        this._wrapper.appendChild(loading);

        loader = doc.createElement('div');
        loader.innerText = 'Loading...';
        loading.appendChild(loader);

        var figure = doc.createElement('figure');
        this._wrapper.appendChild(figure);

        // create caption
        figure.appendChild(doc.createElement('figcaption'));

        return this._wrapper;
    };

  return function (element, opts) {
    var lightbox = Lightbox(opts);

    element.addEventListener('click', function(event) {
      lightbox.show(element);
      event.preventDefault();
    });
  };

});