!function($) {

    var Lightbox = require('lightbox');

    $.ender({
        lightbox: function(opts) {
            var lightbox = new Lightbox(false, opts);
            return this.forEach(function (el) {
                lightbox.attach(el);
            });
        },
    }, true);

}(ender);
