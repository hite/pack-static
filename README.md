# grunt-pack-static

> compress,concat js files css filein tmpl/html directory via scanning file link in file

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pack-static --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pack-static');
```

## The "pack_static" task

### Overview
In your project's Gruntfile, add a section named `pack_static` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  custom_options: {
    options: {
      separator: ';',
      fileType:'*.ftl',
        constVar : {
            '${stylePath}' : 'test/fixtures',
            '${jsRoot}' : 'test/fixtures'
        }
    },
    files: {
      'tmp/': ['test/fixtures/htmltag.ftl']
    }
  }
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.fileType
Type: `String`
Default value: `'.ftl'`

file name's extention which kind of file will be scanned ,processed. 

#### options.mergeCSS
Type: `Boolean`
Default value: `true`

`true` means merge css links otherwise will not merge css links
#### options.mergeJS
Type: `Boolean`
Default value: `true`

`true` means merge javascript links otherwise will not merge javascript links
#### options.constVar
Type: `Object`
Default value:
```javascript
  {
    '${stylePath}' : '.',
    '${jsRoot}' : '.'
  }
```

config about url replace,for example:
```html
<link href="${stylePath}/appjs/app.css" rel="stylesheet" type="text/css"/>
```

The above link's actual path is `./appjs/app.css`;
#### options.deployDir
Type: `String`
Default value:`'dist/'`

directory the built files will be copied to;

### Usage Examples

#### jsMerge, cssMerge grammar

In `html` or `ftl` source files, there are like the below:  

```html
<!--cssmerge_begin:core.css-->
<link href="${stylePath}/sys/123.css" rel="stylesheet" type="text/css"/>
<link href="${stylePath}/testing.css" rel="stylesheet" type="text/css"/>
<!--cssmerge_end:core.css-->
<!--jsmerge_begin:c0.js-->
<script type="text/javascript" src="${jsRoot}/123.js"></script>
<script type="text/javascript" src="${jsRoot}/testing.js"></script>
<!--jsmerge_end:c0.js-->
```

After merged,there are like the below:

```html
<!--cssmerge_begin:core.css-->
<link href="dist/core_a74ad8dfacd4f985eb3977517615ce25.js" rel="stylesheet" type="text/css"/>
<!--cssmerge_end:core.css-->
<!--jsmerge_begin:c0.js-->
<script type="text/javascript" src="dist/c0_b0fce403c178fa57404c1cc4176547a8.js"></script>
<!--jsmerge_end:c0.js-->
```
Meanwhile there are `c0_md5 file` files under `deployDir`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
@2014-10-16 first version released

## License
Copyright (c) 2014 iamhite@gmail.com. Licensed under the MIT license.

