#!/bin/sh

rm -rf lib
edp build -f -s commonjs
mv output/asset lib
rm -rf output
