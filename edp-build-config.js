exports.input = __dirname;
exports.output = require('path').resolve(__dirname, 'dist');

exports.getProcessors = function () {

    /**
     * @file 添加版权声明的构建器
     * @author zhanglili[otakustay@gmail.com]
     */
    var util = require('util');
    var fs = require('fs');
    var path = require('path');

    var copyright = '';

    /**
     * 添加版权声明的构建器
     *
     * @constructor
     * @param {Object} options 初始化参数
     */
    function AmdWrap(options) {
        AbstractProcessor.call(this, options);
    }
    util.inherits(AmdWrap, AbstractProcessor);

    AmdWrap.DEFAULT_OPTIONS = {
        name: 'amdwrap',
        files: ['*.js']
    };

    /**
     * 构建处理
     *
     * @param {FileInfo} file 文件信息对象
     * @param {ProcessContext} processContext 构建环境对象
     * @param {Function} callback 处理完成回调函数
     */
    AmdWrap.prototype.process = function (file, processContext, callback) {
        var data = 'define(function (require, exports, module) {\n' + file.data + '\n})';
        file.setData(data);
        callback && callback();
    };

    var amdwrap = new AmdWrap();

    var module = new ModuleCompiler({
        bizId: 'ei'
    });

    var js = new JsCompressor();

    var path = new PathMapper({
        from: 'lib',
        to: 'dist'
    });

    var cleaner = new OutputCleaner({
        files: ['*.js', '!main.js']
    });

    return {
        'default': [
            amdwrap, module,
            // js,
            path,
            cleaner
        ]
    };
};

exports.exclude = [
    'node_modules',
    '.*',
    '*.json',
    '*.log',
    '*.md',
    '*.txt',
    'tool',
    'doc',
    'test',
    'mock',
    '*.conf',
    'dep/est',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};
