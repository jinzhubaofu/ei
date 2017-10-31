/**
 * @file a test page
 * @author Leon(leon@outlook.com)
 */

import Page from '../../../../src/Page';
import React from 'react';

const TestPage = Page.extend({
    view: props => (12321),
    reducer: function (store) {
        return store;
    }
});

TestPage.type = 'test';

export {
    TestPage as default
}
