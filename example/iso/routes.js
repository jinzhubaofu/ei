/**
 * @file route
 * @author Leon(leon@outlook.com)
 */

module.exports = [{
    path: '/list',
    page: 'iso/list/ListPage',
    template: 'list/index'
}, {
    path: '/detail',
    getInitialState: function (request) {
        return Resource.get('todo').get(request.query.id);
    },
    page: 'iso/detail/DetailPage',
    template: 'detail/index'
}, {
    path: '/add',
    page: 'iso/add/AddPage',
    template: 'add/index'
}];
