/**
 * @file a test page who will throw error
 * @author Leon(leon@outlook.com)
 */

import Page from '../../../../src/Page';
import React from 'react';

export default var TestPage = Page.extend({

    view: props => {
        throw new Error('hehe')
    },

    reducer: function (store) {
        throw new Error('cannot reduce');
    }

});

TestPage.type = 'test';
