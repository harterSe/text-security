# Changes compared to original text-security project

This is a fork of https://github.com/noppa/text-security

The essential changes are:

- supports the whole Basic Multilingual Plane by specifiing multiple fonts with different unicode ranges (https://en.wikipedia.org/wiki/UTF-8) The link explains the different unicode ranges
- browser will only load needed unicode range
- typescript ( ts-node )
- possibility to create fonts for multiple unicode ranges (see build section)

# text-security

Cross-browser alternative to `-webkit-text-security`

This is a simple set of fonts that only consists of 3 different characters.
Disc <img
src="https://cdn.rawgit.com/noppa/text-security/master/assets/disc.svg"
width="5px"> circle <img
src="https://cdn.rawgit.com/noppa/text-security/master/assets/circle.svg"
width="10px"> and square <img
src="https://cdn.rawgit.com/noppa/text-security/master/assets/square.svg"
width="10px">. For example, setting  
`font-family: "text-security-circle"` for
an element should then display all the element's characters in a concealed
way, like it was a password field.

This is useful if you want to get the benefits of `input[type="password"]`
but also combine that with other element types, like `input[type="tel"]`. In
fact, the project was created for this exact purpose [as an answer to a
StackOverflow
question](https://stackoverflow.com/questions/36935576/how-to-make-input-type-tel-work-as-type-password/36950075#36950075).

## Installation

No install from npm with this fork

## Building with custom modifications

Requires NODE 12 (unsing array flatMap)

```
npm install
```

This will print the possible options:

```
npm run build -- --help

Options:
  --help              Show help
                      [boolean]

  --version           Show version number
                      [boolean]

  --baseName, -n      Name of the base font
                      [string]
                      [default"text-security"]

  --shapes, -s        The shapes to build.
                      [array]
                      [choices: "circle", "square", "disc"]
                      [default"disc"]

  --unicodes, -u      Unicode ranges for the font
                      [array]
                      [default: "U+0-780"]

  --outputDir, -o     The relative output path for the font
                      [string]
                      [default: "./font"]

  --shouldComine, -c  Flag indicating if css should be combined into one file
                      [boolean]
                      [default: true]
```

Eg. Following command will genereate the default font folder

```
npm run build -- -s disc square circle -u U+0-780 U+781-5555 U+5556-aaaa U+aaab-ffff
```

Shows detailed conversion progress information

```
Generate configuration

Generate and convert fonts (This can take a while)
Font created
|> shape: disc / range: U+0-780
|> svg ✓  ttf ✓  eot ✓  woff ✓  woff2 ✓
Font created
|> shape: disc / range: U+781-5555
|> svg ✓  ttf ✓  eot ✓  woff ✓  woff2 ✓
Font created
|> shape: disc / range: U+5556-aaaa
|> svg ✓  ttf ✓  eot ✓  woff ✓  woff2 ✓
Font created
|> shape: disc / range: U+aaab-ffff
|> svg ✓  ttf ✓  eot ✓ woff ✓  woff2 ✓
.
.
.
Generate css

Finished
```

## Demo

_demo.html_ contains a proof-of-concept demo file, which you can just open in
any browser.
