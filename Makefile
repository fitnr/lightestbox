.PHONY: all
all: litebox.min.js litebox.min.css

litebox.min.js: litebox.js
	node_modules/.bin/uglifyjs $^ -mc --screw-ie8 > $@

litebox.min.css: css/litebox.css
	node_modules/.bin/cleancss $^ > $@