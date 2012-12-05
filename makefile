all: docs

docs:
	docco lib/*

.PHONY: all docs
