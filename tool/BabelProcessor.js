
var babel = require('babel');
var path = require('path');
var _ = require('underscore');

function Babel(options) {
    AbstractProcessor.call(this, options);
}

Babel.prototype = new AbstractProcessor();
Babel.prototype.name = 'Babel';

Babel.prototype.beforeAll = function (processContext) {
    AbstractProcessor.prototype.beforeAll.call(this, processContext);
    processContext.usedHelpers = [];
};

var FileInfo;

Babel.prototype.process = function (file, processContext, callback) {

    FileInfo = file.constructor;

    var baseDir = processContext.baseDir;
    var fullPath = path.join(baseDir, 'babelHelpers.js');

    var babelHelperRelativePath = path.relative(file.fullPath, fullPath).slice(4).slice(0, -3);

    babelHelperRelativePath = path.normalize(babelHelperRelativePath);

    babelHelperRelativePath = babelHelperRelativePath.indexOf('.') !== 0
        ? './' + babelHelperRelativePath
        : babelHelperRelativePath;

    var filePath = file.path;

    var result = babel.transform(
        file.data,
        {
            ...this.compileOptions,
            filename: file.path
        }
    );

    var code = result.code;

    if (result.metadata.usedHelpers.length) {
        var prefix = 'var babelHelpers = require("' + babelHelperRelativePath + '");\n';
        code = prefix + code;
        processContext.usedHelpers = _.union(
            processContext.usedHelpers,
            result.metadata.usedHelpers
        );
    }

    file.setData(code);

    processContext.addFileLink(filePath, file.outputPath);

    callback();

};

Babel.prototype.afterAll = function (processContext) {

    if (!processContext.usedHelpers.length) {
        return;
    }

    var usedHelpers = babel.buildExternalHelpers(
        processContext.usedHelpers,
        'var'
    );

    var baseDir = processContext.baseDir;
    var relativePath = path.relative(baseDir, 'lib/babelHelpers.js');
    var fullPath = path.join(baseDir, relativePath);

    var helperFile = new FileInfo({
        data: ''
            + usedHelpers
            + '\nmodule.exports = babelHelpers;',
        extname: 'js',
        path: relativePath,
        fullPath: fullPath,
        outputPath: relativePath
    });

    processContext.addFile(helperFile);

    processContext.usedHelpers = null;
};

module.exports = Babel;
