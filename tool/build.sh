#!/bin/sh

edp build -f
mv dist/dist/main.js dist/ei.js
rm -rf dist/dist
rm -rf dist/dep
