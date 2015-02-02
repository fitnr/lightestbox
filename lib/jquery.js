(function($) {
    $.fn.lightestbox = function(options) {

        var L = new lightestbox(options);

        return this.each(function() {
            L.add(this);
        });
    };

}(jQuery));