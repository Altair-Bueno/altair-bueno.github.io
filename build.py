from io import TextIOWrapper
import os
import sys
import re
import json

# Default
__STAIC_RESOURCES=[
    'res/',
    'style.css'
]
__TEMPLATES=[
    'index.html',
    'test.html'
]
__TARGET = 'docs/'
__ORIGIN='template/'

__REPLACE = {
  'NAME':'Altair Bueno',
  'WEBSITE':'https://altair-bueno.github.io/',
  'PROFILEPICTURE':'https://avatars.githubusercontent.com/u/67512202?v=4',
}

# other
__CONFIG_FILE='config/settings.json'
__ALLOWED='[ab-z]|[AB-Z]|_'

def copy_static_to_target():
    for resource in __STAIC_RESOURCES:
        if os.path.isfile(resource):
            string_interpolation = f'\'{__ORIGIN + resource}\' \'{__TARGET}\''
            os.system(f'cp {string_interpolation}')
        else:
            string_interpolation = f'\'{__ORIGIN + resource}\' \'{__TARGET + os.path.dirname(resource)}\''
            os.system(f'cp -R {string_interpolation}')

def compute_line(line:str):
    out_string = ''
    key=''
    
    scape = False
    loading_key = False

    for c in line:
        if loading_key and not (re.match(__ALLOWED,c)):
            loading_key = False
            replace_value = __REPLACE.get(key)
            if replace_value == None:
                sys.stderr.write(f'ERR: key {key} not in dictionary\n')
            else:
                out_string+=replace_value
            key = ''
            out_string+=c
        elif loading_key:
            key+=c
        elif scape:
            #ScapeBar
            out_string+=c
            scape = False
        elif c == '\\':
            scape = True
        elif c == '$':
            # Put from dictionary
            loading_key=True
        else:
            out_string+=c
    return out_string

def compute_template(file_in:TextIOWrapper, file_out:TextIOWrapper):
    for line in file_in:
        if '$' in line:
            out_line = compute_line(line)
            file_out.write(out_line)
        else:
            file_out.write(line)

def load_config():
    with open(__CONFIG_FILE) as f:
        data = json.load(f)
        global __ORIGIN
        global __TARGET
        global __STAIC_RESOURCES
        global __TEMPLATES
        global __REPLACE
        __ORIGIN = data['template_folder']
        __TARGET = data['targer_folder']
        __STAIC_RESOURCES = data['static_resources']
        __TEMPLATES = data['templates']
        __REPLACE = data['replace_dic']

def main():
    # Read config
    load_config()
    
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