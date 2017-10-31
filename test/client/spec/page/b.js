/**
 * @file a test page who will throw error
 * @author Leon(leon@outlook.com)
 */

import Page from '../../../../src/Page';

import React from 'react';

export default const TestPage = Page.extend({

    view: React.createClass({

        render: function () {
            throw new Error('hehe');
        }

    }),

    reducer: function (store) {

        throw new Error('cannot reduce');

        return store;
    }

});

TestPage.type = 'test';
