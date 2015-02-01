main = litebox

.PHONY: all
all: $(main).min.js $(main).min.css $(main).jquery.min.js $(main).zepto.min.js

$(main).min.js: $(main).js
	node_modules/.bin/uglifyjs $^ -mc --screw-ie8 > $@

$(main).%.min.js: $(main).js lib/%.js
	node_modules/.bin/uglifyjs $^ -mc --screw-ie8 > $@

%.min.css: css/%.css
	node_modules/.bin/cleancss $^ > $@