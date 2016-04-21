'use strict';

/*!
    Lightestbox - dependency free lightboxes
    http://github.com/fitnr/lightestbox
    Copyright (C) 2015-6 Neil Freeman
    @license GPL v3
*/
var doc = window.document;

function lightestbox (element, opts) {
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

    // add event listeners
    element.addEventListener('click', self.show);
    
    // Check for 'esc' keypress
    doc.addEventListener('keypress', function(ev) {
        if (ev.key === 27) self.hide();
    });

    this._wrapper.addEventListener('click', self.hide);
    window.addEventListener('resize', self.sizeWrapper);

    return self;
}

Lightestbox.prototype.sizeFigure = function(img) {
    var w = img.width,
        h = img.height,
        max = Math.min(this.options.maxWidth, this.wrapper().style.width.replace('px', '')),
        figure = this.figure();
    figure.style.width = ((w < max) ? w : max) + 'px';
    figure.style.height = ((w < max) ? h : max / w * h) + 'px';
};

Lightestbox.prototype.wrapper = function() {
    return this._wrapper;
};

Lightestbox.prototype.figure = function() {
    return this.wrapper().getElementById('lightbox-figure');
};

// Preloads images. Places new image in lightestbox then centers and displays.
Lightestbox.prototype.show = function(elem, event) {
    // do nothing if not img url not found
    var src = elem.href || elem.dataset.img || false;
    if (!src)
        return false;

    // prep objects
    var wrapper = this.wrapper(),
        figure = this.figure(),
        loading = wrapper.getElementsByTagName('div').item(0),
        caption = figure.getElementsByTagName('figcaption').item(0);

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
    var img = figure.getElementsByTagName('img').item(0) || doc.createElement('img');

    img.addEventListener('load', this.sizeFigure.bind(this));
    img.addEventListener('load', function() {
        figure.style.display = 'block';
    });

    img.src = src;
    figure.insertBefore(img, caption);

    event.preventDefault();
};

Lightestbox.prototype.hide = function() {
    var figure = this.figure();
    this.wrapper().style.display = 'none';
    figure.removeChild(figure.getElementsByTagName('img').item(0));
    doc.removeEventListener('keypress', this.escListener);
};

Lightestbox.prototype.sizeWrapper = function() {
    var wrapper = this.wrapper();
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

    wrapper.className = this.options.prefix + '-wrapper';
    wrapper.id = this.options.prefix + '-wrapper';
    this.sizeWrapper();
    
    loading.className = this.options.prefix + '-loading';
    wrapper.appendChild(loading);
    wrapper.appendChild(figure);

    loader.innerText = 'Loading...';
    loading.appendChild(loader);

    figure.id = 'lightbox-figure';
    figure.appendChild(doc.createElement('figcaption'));

    doc.body.appendChild(wrapper);

    return wrapper;
};

module.exports = lightestbox;