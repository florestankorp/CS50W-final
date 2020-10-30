#!/bin/bash
cwd=$(pwd)

frontend="$cwd/frontend.sh"
backend="$cwd/backend.sh"

gnome-terminal --tab -e $frontend
gnome-terminal --tab -e $backend
