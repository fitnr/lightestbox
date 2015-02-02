!function($) {
    var lightestbox = require('lightestbox');
    $.ender({
        lightestbox: function(opts) {
            var L = new lightestbox(false, opts);

            return this.forEach(function (el) {
                L.add(el);
            });
        },
    }, true);
}(ender);
