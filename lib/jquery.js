/*!
    Lightestbox - dependency free lightboxes
    http://github.com/fitnr/lightestbox
    Copyright (C) 2015-6 Neil Freeman
    @license GPL v3
*/
import lightestbox from "../lightestbox";

(function($) {
    $.fn.lightestbox = function(options) {
        new lightestbox(this, options);
        return this;
    };

}(jQuery));