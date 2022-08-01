# Headless Chrome PDF Maker

## Usage:

```
node chrome-headless-pdf-maker --url url/to/html --pdf path/for/output/pdf
Options:
  -u, --url      URL to html file                            [string] [required]
  -p, --pdf      path to output pdf                          [string] [required]
  -f, --format   All the valid paper format types when printing a PDF, a full
                 list of them at
                 https://pptr.dev/api/puppeteer.lowercasepaperformat/
                                                        [string] [default: "a4"]
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]

Flags:
(Can also be executed with --no-[flag] prefix to set the flag to false)

      --display-header-footer  Whether to show the header and footer
                                                      [boolean] [default: false]
      --omit-background        Hides default white background and allows
                               generating pdfs with transparency
                                                      [boolean] [default: false]
      --landscape              Whether to print in landscape orientation
                                                      [boolean] [default: false]
      --prefer-css-page-size   Give any CSS @page size declared in the page
                               priority over what is declared in the width or
                               height or format option [boolean] [default: true]
      --print-background       Set to true to print background graphics
                                                       [boolean] [default: true]

```

## Requirements

- Node.js >= 14.10