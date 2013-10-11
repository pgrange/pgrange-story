APP=index.js
SRC=$(wildcard *.coffee)
JS=$(SRC:.coffee=.js)
MOCHA=./node_modules/mocha/bin/mocha
COFFEE=./node_modules/coffee-script/bin/coffee

all: test

test: compile
	$(MOCHA)

run: compile
	node $(APP)

compile: install $(JS)


install: .installed
.installed: package.json
	npm install
	@touch .installed
clean:
	rm *.js *.map
dist-clean: clean
	rm .installed
	rm -rf node_modules
%.js: %.coffee
	$(COFFEE) -c -m $<
