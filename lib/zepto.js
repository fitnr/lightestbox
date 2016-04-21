/*!
    Lightestbox - dependency free lightboxes
    http://github.com/fitnr/lightestbox
    Copyright (C) 2015-6 Neil Freeman
    @license GPL v3
*/
import lightestbox from "../lightestbox";

!function($){
    $.extend($.fn, {
        lightestbox: function(options){
            var L = new lightestbox(options);
            $.each(this, function(key, element){
                L.add(element);
            });
            return this;
        }
  });
}(Zepto);