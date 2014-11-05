/*
 * grunt-pack-static
 *
 *
 * Copyright (c) 2014 iamhite@gmail.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var crypto = require('crypto');
    var minimatch = require("minimatch");

    var options = {
        fileType : '**/*.ftl',
        mergeCSS : true,
        mergeJS : true,
        deployDir : 'dist/',
        constVar : {
          '${stylePath}' : '.',
          '${jsRoot}' : '.'
        },
        separator: ', '
    };
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('pack_static', 'compress,concat js files css filein tmpl/html directory via scanning file link in file', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        options = this.options(options);

        // Iterate over all specified file groups.
        this.files.forEach(function(file) {
            // Concat specified files.
            var src = file.src.filter(function(filepath) {
                grunt.log.error(filepath);
                    // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else if (!minimatch(filepath, options.fileType)) {
                    grunt.log.warn('Source file "' + filepath + '" does\'t match fileType :' + options.fileType + ' .SKIP');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                return process(filepath);
            });

            // Print a success message.
            grunt.log.writeln('File pack finished.');
        });
    });
    
    function dispatch (_optional){
        if(_optional.isJS){
            var jsmergeReg = new RegExp('<!--jsmerge_begin:([\\w|\\|\/]+).js-->', 'gmi');
            var getEndJs = function(_match){
              return '<!--jsmerge_end:' + _match + '.js-->';
            };
            return {
                reg : jsmergeReg,
                getEnd : getEndJs,
                matchLink : {
                    ext : '.js',
                    linkReg : '<script type="text/javascript" src="(.+)"></script>',
                    linkFunc : function(_filename){
                        return '\r\n<script type="text/javascript" src="' + _filename + '"></script>\r\n';
                    }
                }
            };
        }else if(_optional.isCSS){
            var jsmergeReg = new RegExp('<!--cssmerge_begin:([\\w|\\|\/]+).css-->', 'gmi');
            var getEndJs = function(_match){
              return '<!--cssmerge_end:' + _match + '.css-->';
            };
            return {
                reg : jsmergeReg,
                getEnd : getEndJs,
                matchLink : {
                    ext : '.css',
                    linkReg : '<link href="(.+)" rel="stylesheet" type="text/css"/>',
                    linkFunc : function(_filename){
                        return '\r\n<link href="'+_filename+'" rel="stylesheet" type="text/css"/>\r\n';
                    }
                }
            };
        }else{
            return {};
        }
    }
    function process(_filepath) {
//        debugger;
        var source = grunt.file.read(_filepath);
        // console.log(source.replace(/\\r\\n/gm,''))
        if(options.mergeJS){
            source =  replace(source,{isJS:true});
        }
        if(options.mergeCSS){
            source =  replace(source,{isCSS:true});
        }
        // clear clean
        var newfile = options.deployDir + _filepath;
        grunt.file.write(newfile, source);
        grunt.log.writeln('File "' + newfile + '" copied.');
        return  source;
    }
    //
    function replace(source,settings){
        var dispatcher = dispatch(settings);
        var mergeReg = dispatcher.reg,
            getEnd = dispatcher.getEnd,
            matchLink = dispatcher.matchLink;

        if(mergeReg == null) {return ;}
        var result,
            spliceIndex = 0,
            targetFile = '';
        while ((result = mergeReg.exec(source)) != null) {
            var start = mergeReg.lastIndex,
                end = source.indexOf(getEnd(RegExp.$1));
            // 截取上一部分
            targetFile += source.substring(spliceIndex, start);
            var jss = source.substring(start, end);

            // 插入替换后的js文件
            targetFile += parseAndConcat(jss, RegExp.$1, matchLink);
            // 重置截取开始游标
            spliceIndex = end;
        }
        // 最后一部分
        if(spliceIndex !==0){
            return targetFile += source.substring(spliceIndex);
        }else{
            return source;
        }
    }
    function parseAndConcat(_input, _newname, _matchLink) {
        var result;

        var mergeReg = new RegExp(_matchLink.linkReg, 'gmi');
        var content = '',
          constVar = options.constVar,
          dir = options.deployDir;
        while ((result = mergeReg.exec(_input)) != null) {

            var filename = RegExp.$1;
            for (var p in constVar) {
                if (constVar.hasOwnProperty(p)) {
                    filename = filename.replace(p,constVar[p]);
                }
            }
            content += grunt.file.read(filename);
        }
        var newfile = dir + _newname + '_' + md5(content) + _matchLink.ext;
        grunt.file.write(newfile, content);
        // Print a success message.
        grunt.log.writeln('File "' + newfile + '" created.');
        return _matchLink.linkFunc(newfile);
    }
    //
    function md5(content, encoding) {
      return crypto.createHash('md5').update(content, encoding || 'yymmddhMMss').digest('hex');
    }
};
