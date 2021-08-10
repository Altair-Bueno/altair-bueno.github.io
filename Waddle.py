#!/usr/bin/env python3

from io import TextIOWrapper
import os
import re
import yaml

# other
__CONFIG_FILE='config/settings.yaml'

"""
Allowed characters for key: [ab-z]|[AB-Z]|_

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

with open(__CONFIG_FILE) as f:
    data = yaml.safe_load(f)
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

def waddle(line:str):
    regex = re.compile(r'[^\\]?(?P<fullmatch>\$(?P<key>([ab-z]|[AB-Z]|_)+)\\?)')
    for match in re.findall(regex,line):
        full = match[0]
        key = match[1]
        replace = __REPLACE[key]
        line = line.replace(full,replace)
    return line



def compute_template(file_in:TextIOWrapper, file_out:TextIOWrapper):
    for line in file_in:
        file_out.write(waddle(line))

"""
Waddle, a template engine for Python

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