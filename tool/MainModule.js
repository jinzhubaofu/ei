/**
 * @file 添加版权声明的构建器
 * @author leon(ludafa@outlook.com)
 */

var fs = require('fs');
var util = require('util');

function MainModule(options) {
    AbstractProcessor.call(this, options);
}

util.inherits(MainModule, AbstractProcessor);

MainModule.prototype.name = 'MainModule';

/**
 * 构建处理
 *
 * @param {FileInfo} file 文件信息对象
 * @param {ProcessContext} processContext 构建环境对象
 * @param {Function} callback 处理完成回调函数
 */
MainModule.prototype.process = function (file, processContext, callback) {

    file.setData(''
        + file.data
        + '\n'
        + fs.readFileSync(__dirname + '/main.js', 'utf8')
    );

    callback();
};

module.exports = MainModule;
