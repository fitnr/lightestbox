/*!
    Litebox - dependency free lightboxes
    http://github.com/fitnr/litebox
    Copyright (C) 2015 Neil Freeman
    License GPL v3
*/
! function(name, definition) {

    if (typeof module != 'undefined')
        module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object')
        define(definition);
    else
        this[name] = definition();

}('litebox', function() {
    var doc = window.document;

    function listenEsc(context) {
        return function(event) {
            if (event.key === 27) context.hide();
        };
    }

    function bind(element, type, callback) {
        var context = this;
        var handler = function(ev) {
            return callback.call(context, element, ev);
        };

        element.addEventListener(type, handler);
    }

    function Litebox(element, opts) {
        var defaults = {
            prefix: 'litebox',
            maxWidth: Infinity,
            useTitle: true,
        };

        this.options = (typeof opts === 'object') ? opts : {};

        for (var property in defaults) {
            if (defaults.hasOwnProperty(property) && !this.options.hasOwnProperty(property))
                this.options[property] = defaults[property];
        }

        this._wrapper = null;
        this._figure = null;
        this.escListener = listenEsc(this);

        if (element)
            this.add(element);

        return this;
    }

    Litebox.prototype.sizeFigure = function(img) {
        var w = img.width,
            h = img.height,
            max = Math.min(this.options.maxWidth, this.wrapper().style.width.replace('px', '')),
            figure = this.figure();
        figure.style.width = ((w < max) ? w : max) + 'px';
        figure.style.height = ((w < max) ? h : max / w * h) + 'px';
    };

    Litebox.prototype.wrapper = function() {
        return this._wrapper || this.create();
    };

    Litebox.prototype.figure = function() {
        return this._figure || this.wrapper().getElementsByTagName('figure').item(0);
    };

    // Preloads images. Pleaces new image in litebox then centers and displays.
    Litebox.prototype.show = function(elem, event) {
        // do nothing if not img url not found
        var src = elem.href || elem.dataset.img || false;
        if (!src)
            return false;

        // prep objects
        var wrapper = this.wrapper(),
            figure = this.figure(),
            loading = wrapper.getElementsByTagName('div').item(0),
            caption = figure.getElementsByTagName('figcaption').item(0);

        // get this out of the way
        event.preventDefault();

        // show wrapper and loading css, hide figure
        figure.style.display = 'none';
        wrapper.style.display = loading.style.display = 'block';

        var captiontext = (this.options.useTitle) ? elem.title : elem.dataset.caption;

        if (captiontext) {
            caption.style.display = 'block';
            caption.innerHTML = captiontext;
        } else {
            caption.style.display = 'none';
            caption.innerHTML = '';
        }

        // create image
        var img = doc.createElement('img');

        bind.call(this, img, 'load', this.sizeFigure);
        bind.call(this, img, 'load', function() {
            figure.style.display = 'block';
        });

        img.src = src;
        figure.insertBefore(img, caption);

        // Check for 'esc' keypress
        doc.addEventListener('keypress', this.escListener);
    };

    Litebox.prototype.hide = function() {
        var figure = this.figure();
        this.wrapper().style.display = 'none';
        figure.removeChild(figure.getElementsByTagName('img').item(0));
        doc.removeEventListener('keypress', this.escListener);
    };

    Litebox.prototype.sizeWrapper = function() {
        var wrapper = this.wrapper();
        wrapper.style.width = window.innerWidth + 'px';
        wrapper.style.height = window.innerHeight + 'px';
    };

    /* elements created:
        <div class="litebox-wrapper">
          <div class="litebox-loading"><div>Loading</div></div>
          <figure>
            <img src="{ a.href }" />
            <figcaption>{ a.title }</figcaption>
          </figure>
        </div>
    */
    Litebox.prototype.create = function() {
        this._wrapper = doc.createElement("div");
        this._wrapper.className = this.options.prefix + '-wrapper';
        this.sizeWrapper();

        bind.call(this, this._wrapper, 'click', this.hide);
        bind.call(this, window, 'resize', this.sizeWrapper);

        doc.body.insertBefore(this._wrapper, doc.body.firstChild);

        var loading = doc.createElement('div');
        loading.className = this.options.prefix + '-loading';
        this._wrapper.appendChild(loading);

        loader = doc.createElement('div');
        loader.innerText = 'Loading...';
        loading.appendChild(loader);

        this._figure = doc.createElement('figure');
        this._wrapper.appendChild(this._figure);

        this._figure.appendChild(doc.createElement('figcaption'));

        return this._wrapper;
    };

    Litebox.prototype.add = function(element) {
        try {
            bind.call(this, element, 'click', this.show);    
        } catch (e) {
            // noop
        }

        return element;
    };

    return Litebox;
});
