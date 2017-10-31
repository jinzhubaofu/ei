/**
 * @file a test page
 * @author Leon(leon@outlook.com)
 */

import Page from '../../../../src/Page';

import React from 'react';

export default const TestPage = Page.extend({

    view: React.createClass({

        render: function () {
            return React.createElement('div');
        }

    }),

    reducer: function (store) {
        return store;
    }

});

TestPage.type = 'test';
