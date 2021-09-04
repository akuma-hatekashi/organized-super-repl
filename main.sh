#!/bin/bash

if [[ -f "main.sh" ]]; then
  printf "I am a bash program!"
else
  printf "main.sh not found!"
fi
exit 0
