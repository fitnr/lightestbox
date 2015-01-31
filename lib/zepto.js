!function($){
    $.extend($.fn, {
        litebox: function(options){
            var Litebox = new litebox(options);
            $.each(this, function(key, element){
                Litebox.add(element);
            });
            return this;
        }
  });
}(Zepto);