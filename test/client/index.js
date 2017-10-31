/**
 * @file test index
 * @author leon <ludafa@outlook.com>
 */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter()
});

const specContext = require.context('./spec', true, /\.spec\.js$/)
const specs = specContext
    .keys()
    .filter(spec => /\.spec\.js$/.test(spec))
    .forEach(specContext)
