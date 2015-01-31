!function($) {
    var Litebox = require('litebox');
    $.ender({
        litebox: function(opts) {
            var litebox = new Litebox(false, opts);

            return this.forEach(function (el) {
                litebox.add(el);
            });
        },
    }, true);
}(ender);
