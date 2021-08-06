#!/usr/bin/env python3

from io import TextIOWrapper
import os
import sys
import re
import json

# other
__CONFIG_FILE='config/settings.json'

"""
Regrex will match any of the following keys
- Hello_world
- HELLO_WORLD
- helloworld

Regrex won't match any of the following keys
- H6
- 94
- 8h
- hello-world
- h$y
- Hello&world
"""
__ALLOWED='[ab-z]|[AB-Z]|_'

with open(__CONFIG_FILE) as f:
    data = json.load(f)
    __ORIGIN = data['template_folder']
    __TARGET = data['targer_folder']
    __STAIC_RESOURCES = data['static_resources']
    __TEMPLATES = data['templates']
    __REPLACE = data['replace_dic']

def copy_static_to_target():
    for resource in __STAIC_RESOURCES:
        if os.path.isfile(resource):
            string_interpolation = f'\'{__ORIGIN + resource}\' \'{__TARGET}\''
            os.system(f'cp {string_interpolation}')
        else:
            string_interpolation = f'\'{__ORIGIN + resource}\' \'{__TARGET + os.path.dirname(resource)}\''
            os.system(f'cp -R {string_interpolation}')

"""
TODO
Definetly not the best performant script
but it should do the trick. Also, public
repositories get free GitHub Actions so...
"""

def compute_line(line:str):
    out_string = ''
    key=''
    
    scape = False
    loading_key = False

    for c in line:
        if loading_key and not (re.match(__ALLOWED,c)):
            # end of key
            loading_key = False
            replace_value = __REPLACE.get(key)
            if replace_value == None:
                sys.stderr.write(f'ERR: key {key} not found in dictionary. It will be skipped\n')
            else:
                out_string+=replace_value
            key = ''
            if c != '\\': out_string+=c
        elif loading_key:
            # Add to key
            key+=c
        elif scape:
            # Scaped character
            out_string+=c
            scape = False
        elif c == '\\':
            # Scape next character
            scape = True
        elif c == '$':
            # Start of key
            loading_key=True
        else:
            # Nothing
            out_string+=c
    return out_string

def compute_template(file_in:TextIOWrapper, file_out:TextIOWrapper):
    for line in file_in:
        if '$' in line:
            out_line = compute_line(line)
            file_out.write(out_line)
        else:
            file_out.write(line)

"""
build.py
1. Remove __TARGET folder content
2. Proccess templates folder
3. Add __STATIC_RESOURCES to __TARGET

This script will look inside every template file and check
if it contains any placeholder and it will try to replace it
using the __CONFIG_FILE dictionary. A placeholder looks like 
any of the following:
- $Hello_World
- $HELLO
- $placeholder

Some examples of their uses:
- <$HTML_TAG>
- i $word $other_word
- Mi$placeholder\ddle   <-- if placeholder==VALUE then MiVALUEddle
- Mi$placeholder\\\ddle <-- if placeholder==VALUE then MiVALUE\ddle
- scaped \$ dollar      <-- scaped $ dollar

IMPORTANT: This script is **PLATFORM AGNOSTIC**. It'll only work on 
UNIX-like systems. I don't know enought Python to use the stdlib
for file transfers
"""

def main():
    # Read config
    
    # Delete folder content
    os.system(f'rm -fr {__TARGET} && mkdir {__TARGET}')

    # Parse files
    for template_name in __TEMPLATES:
        open(__TARGET + template_name,'x')
        output_file = open(__TARGET + template_name,'wt')
        input_file = open(__ORIGIN + template_name,'rt')
        
        compute_template(input_file,output_file)
        
        output_file.close()
        input_file.close()

    # Copy static to target
    copy_static_to_target()


if __name__=='__main__':
    main()