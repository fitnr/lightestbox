var Lightestbox = (function () {
    'use strict';

    /*!
        Lightestbox - dependency free lightboxes
        http://github.com/fitnr/lightestbox
        Copyright (C) 2015-6 Neil Freeman
        @license GPL v3
    */
    var doc = window.document;

    function Lightestbox(elements, opts) {
        var defaults = {
            prefix: 'ltbx',
            maxWidth: Infinity,
            useTitle: true,
        };
        var self = this;
        self.options = opts || {};

        for (var property in defaults) {
            if (defaults.hasOwnProperty(property) && !self.options.hasOwnProperty(property))
                self.options[property] = defaults[property];
        }

        self._wrapper = self.createWrapper();

        self.add(elements || []);
        
        // Check for 'esc' keypress
        doc.addEventListener('keypress', function(ev) {
            if (ev.key === 27) self.hide();
        });

        this._wrapper.addEventListener('click', self.hide.bind(self));
        window.addEventListener('resize', function() {
            self.sizeWrapper(self._wrapper);
        });

        return self;
    }

    Lightestbox.prototype.sizeFigure = function(img) {
        var w = img.width,
            h = img.height,
            max = Math.min(this.options.maxWidth, this._wrapper.style.width.replace('px', '')),
            figure = this.figure();
        figure.style.width = ((w < max) ? w : max) + 'px';
        figure.style.height = ((w < max) ? h : max / w * h) + 'px';
    };

    Lightestbox.prototype.figure = function() {
        return this._wrapper.getElementsByTagName('figure').item(0);
    };

    // Preloads images. Places new image in lightestbox then centers and displays.
    Lightestbox.prototype.show = function(event) {
        // do nothing if not img url not found
        var elem = event.target;
        var src = elem.getAttribute('href') || elem.dataset.img || false;
        if (!src)
            return false;

        // objects
        var self = this,
            wrapper = self._wrapper,
            figure = self.figure(),
            loading = wrapper.getElementsByTagName('div').item(0),
            caption = figure.getElementsByTagName('figcaption').item(0);

        // show wrapper and loading css, hide figure
        figure.style.display = 'none';
        wrapper.style.display = loading.style.display = 'block';

        var captiontext = (self.options.useTitle) ? elem.title : elem.dataset.caption;

        if (captiontext) {
            caption.style.display = 'block';
            caption.innerHTML = captiontext;
        } else {
            caption.style.display = 'none';
            caption.innerHTML = '';
        }

        // create image
        var img = figure.getElementsByTagName('img').item(0) || doc.createElement('img');

        img.addEventListener('load', function() {
            self.sizeFigure(img);
            figure.style.display = 'block';
        });

        img.src = src;
        figure.insertBefore(img, caption);

        event.preventDefault();
    };

    Lightestbox.prototype.hide = function() {
        var figure = this.figure();
        this._wrapper.style.display = 'none';
        figure.removeChild(figure.getElementsByTagName('img').item(0));
    };

    Lightestbox.prototype.sizeWrapper = function(wrapper) {
        wrapper.style.width = window.innerWidth + 'px';
        wrapper.style.height = window.innerHeight + 'px';
    };

    /* elements created:
        <div class="ltbx-wrapper" id="ltbx-wrapper">
          <div class="ltbx-loading"><div>Loading</div></div>
          <figure>
            <img src="{ href }" />
            <figcaption>{ title }</figcaption>
          </figure>
        </div>
    */
    Lightestbox.prototype.createWrapper = function() {
        var wrapper = doc.createElement("div");
        var figure = doc.createElement('figure');
        var loading = doc.createElement('div');
        var loader = doc.createElement('div');
        var prefix = this.options.prefix;

        wrapper.className = prefix + '-wrapper';
        wrapper.id = prefix + '-wrapper';
        this.sizeWrapper(wrapper);
        
        loading.className = prefix + '-loading';
        wrapper.appendChild(loading);
        wrapper.appendChild(figure);

        loader.innerText = 'Loading...';
        loading.appendChild(loader);

        figure.appendChild(doc.createElement('figcaption'));

        doc.body.appendChild(wrapper);

        return wrapper;
    };

    /**
     * @param {NodeList} elements
     */
    Lightestbox.prototype.add = function(elements) {
        try {
            var show = this.show.bind(this);
            Array.prototype.map.call(elements, function(el) {
                el.addEventListener('click', show);
            });
        } catch (e) {
            console.error(e);
        }
        return this;
    };

    return Lightestbox;

}());