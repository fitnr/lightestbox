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