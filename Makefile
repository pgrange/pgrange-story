APP=index.js
SRC=$(wildcard *.coffee)
JS=$(SRC:.coffee=.js)
MOCHA=./node_modules/mocha/bin/mocha
COFFEE=./node_modules/coffee-script/bin/coffee

help:
	@echo "\tmake test: run tests"
	@echo "\tmake run: run server"
	@echo "\tmake clean: clean all build files"
	@echo "\tmake dist-clean: you probably don't want this"

test: compile
	$(MOCHA)

run: compile
	node $(APP)

clean:
	rm *.js *.map

compile: install $(JS)
install: .installed
.installed: package.json
	npm install
	@touch .installed
dist-clean: clean
	rm .installed
	rm -rf node_modules
%.js: %.coffee
	$(COFFEE) -c -m $<
.PHONY: clean help dist-clean install compile run test
