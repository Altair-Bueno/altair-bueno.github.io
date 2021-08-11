# Waddle

Waddle is a simple template engine built on Python. It is meant for small 
templates. To use it on your own templates, i recommend building 
templates on GitHub actions. You can check the workflow [here](.github/workflows/build-website.yaml)

# Requirements

- Python 3.X
- [pyyaml](https://pypi.org/project/PyYAML/)

# Usage

1. Store all your templates on some kind of template folder (eg. template/)
2. From the content root, create a `./config/settings.yaml` file
3. Fill the content of the settings file as follows:

|Key| Description | 
|---| ----------- |
| `template_folder` | Where Waddle will search for templates |
| `targer_folder` | Where Waddle will copy all generated files and static resources |
| `static_resources` | Static resources to copy to the target folder |
| `templates` | Templates that need parsing |
| `replace_dic` | Dictionary of `keys: values`. this values will be replaced on the template|

To see examples of usage, check the [settings.yaml](config/settings.yaml)

Once set up everything, run this from the command line on the root folder

```bash
# on macOS, make sure you are using python 3 (python3)
python Waddle.py
```

> NOTE: Waddle will notify on sterr if any key was missing

# Creating templates

A template can be any kind of text file which contains placeholders. 
A placeholder is a string of alphabetical characters or underscores `_`. 
To use placeholders on templates, first define them on the `replace_dic`
section on `config/settings.yaml`. Here are some examples

```html
<html>
    <body>
        $SINGLE_ON_LINE
        <h1>$inside_tag</h1>
        <p>
            Inside some $text
            Inside some wo$rd
            I$side_some_wor\d 
            scape dolar \$
        </p>
        $div
    </body>
</html>
```

```yaml
SINGLE_ON_LINE: Single on line
inside_tag: inside tag
text: text
rd: This was a placeholder
side_some_wor: This was inside a word
div: <div></div>
```

Output:

```html
<html>
    <body>
        Single on line
        <h1>inside tag</h1>
        <p>
            Inside some text
            Inside some woThis was a placeholder
            IThis was inside a wordd 
            scape dolar $
        </p>
        <div></div>
    </body>
</html>