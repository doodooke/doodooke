#!/bin/bash

if [ -e "./node" ]
then
   ./node --require ./upgrade.js $*
   exit
fi

if [ -e "./node.exe" ]
then
   ./node.exe --require ./upgrade.js $*
   exit
fi

node --require ./upgrade.js $*