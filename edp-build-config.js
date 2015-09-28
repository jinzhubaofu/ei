/**
 * @file ei edp build config
 * @author leon(ludafa@outlook.com)
 */

require('babel/register');

exports.input = __dirname;
exports.output = require('path').resolve(__dirname, 'output');

/* globals LessCompiler, CssCompressor, JsCompressor, PathMapper, AmdWrapper, AbstractProcessor */
/* globals AddCopyright, ModuleCompiler, TplMerge, BabelProcessor, MainModule, OutputCleaner */

exports.getProcessors = function () {

    var module = new ModuleCompiler({
        bizId: 'ei'
    });

    var path = new PathMapper({
        from: 'lib',
        to: 'dist'
    });

    var babel = new BabelProcessor({
        files: ['lib/**/*.js'],
        compileOptions: {
            stage: 0,
            modules: 'amd',
            compact: false,
            ast: false,
            blacklist: ['strict'],
            externalHelpers: true,
            moduleId: '',
            getModuleId: function (filename) {
                return filename.replace('lib/', '');
            }
        }
    });

    return {
        'default': [
            babel,
            module,
            // mainModule,
            // replace,
            // js,
            path,
            // cleaner
        ]
    };
};

exports.exclude = [
    'coverage',
    'example',
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

    /* eslint-disable guard-for-in */
    for (var key in processors) {
        global[key] = processors[key];
    }

    global.AmdWrapper = require('./tool/AmdWrapper.js');
    global.MainModule = require('./tool/MainModule.js');
    global.BabelProcessor = require('./tool/BabelProcessor.js');

};
