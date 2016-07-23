#!/bin/bash
for originfile in `ls 'src'`
do
        filetype=${originfile##*.}
        minfile=${originfile%.*}'.min.'$filetype
        uglifyjs -o 'build/'$minfile 'src/'$originfile
done

