#!/usr/bin/env python3
import os
import re
import shutil
from yaml import safe_load


# Where the config file is located
__CONFIG_FILE = 'config/settings.yaml'

# Compiled regex
# fullmatch = 0
# key = 1
__REGEX = re.compile(r'[^\\]?(?P<fullmatch>\$(?P<key>([ab-z]|[AB-Z]|_)+)\\?)')

with open(__CONFIG_FILE) as f:
    data = safe_load(f)
    __ORIGIN = data['template_folder']
    __TARGET = data['targer_folder']
    __STATIC_RESOURCES = data['static_resources']
    __TEMPLATES = data['templates']
    __REPLACE = data['replace_dic']

def waddle(line:str):
    for match in re.findall(__REGEX,line):
        full = match[0]
        key = match[1]
        replace = __REPLACE[key]
        if replace == None:
            replace = ''
        line = line.replace(full,replace)
    return line

def process_template(template_name:str):
    output_path = __TARGET + template_name
    input_path =__ORIGIN + template_name

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    output_file = open(output_path,'wt')
    input_file = open(input_path,'rt')

    for line in input_file:
        output_file.write(waddle(line))
    
    output_file.close()
    input_file.close()

def copy_static(resource:str):
    origin_path = __ORIGIN + resource
    target_path = __TARGET + resource
    if os.path.isfile(origin_path):
        shutil.copy(origin_path,target_path)
    else:
        if os.path.exists(target_path):
            shutil.rmtree(target_path)
        shutil.copytree(origin_path,target_path)

"""
Waddle, a simple template engine for Python

Steps: 

1. Proccess templates folder
2. Add __STATIC_RESOURCES to __TARGET if updated

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

Allowed characters for key: [ab-z]|[AB-Z]|_

Regrex will match any of the following keys:
- Hello_world
- HELLO_WORLD
- helloworld

Regrex won't match any of the following keys:
- H6
- 94
- 8h
- hello-world
- h$y
- Hello&world
"""

def main():
    # Parse template files
    for template_name in __TEMPLATES:
       process_template(template_name)

    # Copy static resources to target
    for resource in __STATIC_RESOURCES:
        copy_static(resource)

if __name__=='__main__':
    main()