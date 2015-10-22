#!/bin/sh

rm -rf lib
edp build -f -s cmd
mv output/lib lib
rm -rf output
