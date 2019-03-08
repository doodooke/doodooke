#!/bin/bash

if [ -e "./node" ]
then
   DOODOO_SH=true ./node $*
   exit
fi

if [ -e "./node.exe" ]
then
   DOODOO_SH=true ./node.exe $*
   exit
fi

DOODOO_SH=true node $*