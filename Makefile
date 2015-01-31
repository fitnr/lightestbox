.PHONY: all
all: litebox.js litebox.min.js litebox.min.css

litebox.js: src/litebox.js
	node_modules/.bin/uglifyjs $^ -b --comments all > $@

litebox.min.js: src/litebox.js
	node_modules/.bin/uglifyjs $^ -mc --screw-ie8 > $@

litebox.min.css: css/litebox.css
	node_modules/.bin/cleancss $^ > $@