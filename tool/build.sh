#!/bin/sh

rm -rf dist
edp build -f
mv output/dist dist
