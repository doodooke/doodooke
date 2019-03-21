#!/bin/bash

if [ -e "./node" ]
then
   ./node $*
   exit
fi

if [ -e "./node.exe" ]
then
   ./node.exe $*
   exit
fi

node $*
