#!/bin/sh

rm -rf lib
edp build -f -s commonjs
mv output/lib lib
rm -rf output
