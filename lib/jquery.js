(function($) {
    $.fn.litebox = function(options) {

        var Litebox = new litebox(options);

        return this.each(function() {
            Litebox.add(this);
        });
    };

}(jQuery));