/**
 * @file BabelProcessor.js
 * @author leon(ludafa@outlook.com)
 */

/* globals AbstractProcessor*/

var babel = require('babel-core');
var path = require('path');
var util = require('util');

function Babel(options) {
    AbstractProcessor.call(this, options);
}

util.inherits(Babel, AbstractProcessor);

Babel.prototype.name = 'Babel';

Babel.DEFAULT_OPTIONS = {
    /**
     * 项目的配置文件
     * @type {string}
     */
    configFile: 'module.conf',
    files: ['src/**/*.js']
};

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
        Object.assign(
            {},
            this.compileOptions,
            {filename: file.path}
        )
    );

    var code = result.code;

    if (result.metadata.usedHelpers.length) {
        var prefix = 'var babelHelpers = require("' + babelHelperRelativePath + '");\n';
        code = prefix + code;
        processContext.usedHelpers = processContext
            .usedHelpers
            .concat(result.metadata.usedHelpers);
    }

    file.setData(code);

    processContext.addFileLink(filePath, file.outputPath);

    callback();

};

Babel.prototype.afterAll = function (processContext) {

    var usedHelpers = ''
        + babel.buildExternalHelpers(processContext.usedHelpers, 'var')
        + '\nmodule.exports = babelHelpers;';

    var baseDir = processContext.baseDir;

    var configFile = path.resolve(baseDir, this.configFile);

    var content = require('fs').readFileSync(configFile, 'UTF-8');

    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }

    var moduleConfig = JSON.parse(content);

    var relativePath = this.outputPath;

    if (!relativePath) {
        relativePath = path.join(
            moduleConfig.baseUrl || 'src',
            'babelHelpers.js'
        );
    }

    var fileData = new FileInfo({
        data: usedHelpers,
        extname: path.extname(relativePath).slice(1),
        path: relativePath,
        fullPath: path.resolve(baseDir, relativePath)
    });

    processContext.addFile(fileData);

    return fileData;

};


module.exports = Babel;
