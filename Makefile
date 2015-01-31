main = litebox.js

.PHONY: all
all: litebox.min.js litebox.min.css litebox.jquery.min.js litebox.zepto.min.js

litebox.min.js: $(main)
	node_modules/.bin/uglifyjs $^ -mc --screw-ie8 > $@

litebox.%.min.js: $(main) lib/%.js
	node_modules/.bin/uglifyjs $^ -mc --screw-ie8 > $@

litebox.min.css: css/litebox.css
	node_modules/.bin/cleancss $^ > $@