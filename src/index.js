/**
 * @file ei主入口
 * @author Leon(leon@outlook.com)
 * @module ei
 */

import App from './App';
import Page from './Page';
import Container from './Container';
import events from './events';
import * as resource from './resource';

import {
    INIT,
    REPLACE,
    init,
    replace
} from './actionCreator/page';

export {
    App,
    Page,
    Container,
    events,
    resource
};

export const actionTypes = {
    INIT,
    REPLACE
};

export const actions = {
    init,
    replace
};
