/**
 * @file event emitter spec
 * @author Leon(leon@outlook.com)
 */

var Emitter = require('../../../src/Emitter');

describe('Emitter', function () {

    it('enable', function () {

        var target = {};

        Emitter.enable(target);

        expect(typeof (target.emit) === 'function').toBe(true);
        expect(typeof (target.on) === 'function').toBe(true);
        expect(typeof (target.off) === 'function').toBe(true);
        expect(typeof (target.once) === 'function').toBe(true);

        var targetFn = function () {};

        Emitter.enable(targetFn);

        expect(typeof (targetFn.prototype.emit) === 'function').toBe(true);
        expect(typeof (targetFn.prototype.on) === 'function').toBe(true);
        expect(typeof (targetFn.prototype.off) === 'function').toBe(true);
        expect(typeof (targetFn.prototype.once) === 'function').toBe(true);

    });

    it('on', function () {

        var emitter = new Emitter();

        var spy = jasmine.createSpy();

        emitter.on('hehe', spy);

        emitter.emit('hehe', 12321);

        expect(spy).toHaveBeenCalledWith(12321);

    });

    it('off no handler will non-effect', function () {

        var emitter = new Emitter();

        expect(function () {
            emitter.off('a');
        }).not.toThrow();

        emitter.on('b', function () {});

        expect(function () {
            emitter.off('a');
        }).not.toThrow();

    });

    it('off clear specific type and specific handler', function () {

        var emitter = new Emitter();

        var spy1 = jasmine.createSpy();
        var spy2 = jasmine.createSpy();

        emitter.on('a', spy1);
        emitter.on('a', spy2);

        emitter.off('a', spy2);

        emitter.emit('a');
        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();

        emitter.off('a', spy2);

        emitter.emit('a');
        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();

    });

    it('off clear listeners of a event type', function () {

        var emitter = new Emitter();

        var spy1 = jasmine.createSpy();
        var spy2 = jasmine.createSpy();

        emitter.on('a', spy1);
        emitter.on('a', spy2);

        emitter.off('a');

        emitter.emit('a');
        expect(spy1).not.toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();

    });

    it('off clear all listeners', function () {

        var emitter = new Emitter();

        var spy = jasmine.createSpy();

        emitter.on('a', spy);
        emitter.on('b', spy);

        emitter.off();

        emitter.emit('a');
        emitter.emit('b');
        expect(spy).not.toHaveBeenCalled();

    });

    it('once', function () {

        var emitter = new Emitter();

        var spy = jasmine.createSpy();

        emitter.once('hehe', spy);

        emitter.emit('hehe', 12321);

        expect(spy).toHaveBeenCalledWith(12321);

        emitter.emit('hehe', 2222);

        expect(spy).not.toHaveBeenCalledWith(2222);

    });

    it('trigger * handler', function () {

        var emitter = new Emitter();

        var spy = jasmine.createSpy();

        emitter.on('*', spy);

        emitter.emit('hehe', 123);

        expect(spy).toHaveBeenCalledWith(123);

    });

    it('can get current event while event dispatching', function () {

        var emitter = new Emitter();

        emitter.on('a', function () {

            expect(this.getCurrentEvent()).toBe('a');

        });

        emitter.emit('a');

    });

});
