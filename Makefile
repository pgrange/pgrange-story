APP=index.js
SRC=$(wildcard *.coffee)
JS=$(SRC:.coffee=.js)

all: test

test: compile
	mocha

run: compile
	node $(APP)

compile: $(JS)

clean:
	rm *.js *.map

%.js: %.coffee
	coffee -c -m $<
