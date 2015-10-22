#!/bin/sh

rm -rf dist
edp build -f -s amd
mv output/dist dist
rm -rf output
