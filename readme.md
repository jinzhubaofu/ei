# efe isomorphic framework

简洁的flux同构框架

## 特点

+ 同构，同时支持node/browser，one world one code
+ 支持多页面网站应用化 / 单页面网站服务器预渲染
+ 简单易懂的函数式编程思维管理你的store
+ 提供更好的领域划分，避免flux模式中不良编码模式

## 术语

### Store

在`ei`中，`store`是一个页面中全部的数据。

### State

在`ei`中，`state`是指`store`在某一时刻的状态。所以，`state`也就是页面中所有的数据。一般来讲是一个`Object`或者是一个`key-value`的集合。但理论上来说，它可以是你想要任何一种数据类型。

我们会将`state`传递给`react`，作为`react`组件的数据来使用；通过`react`组件的翻译，数据将被转化为DOM，最终成为可见、可交互的页面。

### Action

`Action`是一个数据包裹，用来描述系统内一个事件。比如，用户点击一个添加按钮，可以通过下面这个`action`来描述：

```js

{
    type: 'ADD'
}

```

完成了一个ajax请求，可以被描述为：

```js

{
    type: 'AJAX_SUCCEED',
    data: {
        // all the data from the datasource
    }
}

```

基于这样的约定，我们可以把页面理解成一个持续产生`action`的事件流系统。每个行为都会对我们页面中当前的`state`造成一定影响，使其发生变化。因此，我们每个时刻的`state`都可以理解为之前所有的`action`的积累。

### reducer

基于前边两个概念我们可以知道，版本1`state`在一个`action`的作用下会转变成版本2`state`，这个过程我们称之为`reduce`（归并）。我们当然希望`reduce`的过程由我们自己来掌握，在`ei`中抽象为`reducer`。

我们可给出一个非常简洁的函数原型来描述这个过程：

```js

var state2 = reducer(state1, action);

```


> 我们非常希望可以通过 `state1` === `state2` 这种简单的方法来判断数据是否发生了变化，只要（只有）数据发生变化，我们才会通知`view`(react)来完成视图上的更新。
> 因此，这里非常适合使用`Immutable`数据结构来管理`state`。（如果不用可能会蛋疼。。。）
> 这种行为在`ei`中是默认行为，`ei`会自动`state1` === `state2`的方式来检测`state`的变化，并将变化即时地通知给`react`。
> 如果你的视图不更新了，那么请检查`reduce`返回的结果是不是同一个对象。请确保当数据需要发生变化时 `state1` !== `state2`。

由于，`ei`中所有的数据都存放在`state`中，因此我们只需要一个顶级的`reducer`就作为入口即可。

我们设计的`reducer`是一个纯函数，我们可以非常容易地进行组合完成复杂的业务逻辑，比如这样：

```js

var add = function (state, action) {

    return state + 1;

};

var minus = function (state, action) {

    return state - 1;

};

var reducer = function (state, action) {

    switch (action.type) {

        case 'ADD':

            return add(state, action);

        case 'MINUS':

            return minus(state, action);


    }

};

```

因此，我们不再需要`flux`中`store`的`waitFor`方法，我们只需要按逻辑执行不同的子`reducer`即可。举个例子：

```js

var a = function (state, action) {
    // some operation on state according to action;
    return state;
};

var needWaitForA = function (state, action) {
    // some operation on state according to action;
    return state;
};

var reducer = function (state, action) {

    state = a(state, action);

    return needWaitForA(state, action);

};

```


> 实际上，我们还可以把这样的系统理解为一个`有限状态自动机`，每一个`action`可以理解为一个输入，而`reducer`则是状态转移函数。

### dispatch

为了使 `state` / `action` / `reducer`可以结合在一起，正常工作，我们引入了`dispatch`。 `dispatch`用来连接 `state` / `action`/ `reducer`。

当系统接收到一个`action`时，我们找到`store`，取得它的当前`state`，再将`state`和`action`传入`reducer`。最后，将`reducer`的返回结果写回到`store`中。

`dispatch`可以接收两种数据结构。第一种是传入一个`action`，这非常容易理解，正是我们想要的。另一种情况是传入一个函数，这是为了支持异步操作。

当传入`dispatch`的是一个函数中，这个函数会得到两个参数，分别是`dispatch`和`state`。也就是说在这个函数中，既可以得到所有的数据，也可以多次`dispatch`动作。

举个例子，

```js

dispatch(function (dispatch, state) {

    dispatch({
        type: 'AJAX_START'
    });

    http
        .get(
            '/some/data/from/any/datasource',
            {
                query: state.someData
            }
        )
        .then(
            function (data) {
                dispatch({
                    type: 'AJAX_SUCCEED',
                    data: data
                });
            },
            function (error) {
                dispatch({
                    type: 'AJAX_FAILED',
                    error: error
                });
            }
        );

});

```

可以看到，在这一次`dispatch`过程中，实际上派发了多个`action`。因此，我们可以通过`reducer`来调整`state`，从而在视图上给用户良好的反馈。

### ActionCreator

出于重复复用`action`的目的，我们提出`ActionCreator`的概念。每个`ActionCreator`是一种`action`的工厂(action factory)。

这它是一个函数，接收的参数格式不限，但返回值必须是一个`action`或者是一个`function`。

举个例子

```js

function syncAddActionCreator(count) {

    return {
        type: 'SYNC_ADD',
        data: count
    };

}

function asyncAddActionCreator(count) {

    return function (dispatch, state) {

        dispatch({
            type: 'AJAX_START'
        });

        http
            .get(
                '/some/data/from/any/datasource',
                {
                    query: state.someData
                }
            )
            .then(
                function (data) {
                    dispatch({
                        type: 'AJAX_SUCCEED',
                        data: data
                    });
                },
                function (error) {
                    dispatch({
                        type: 'AJAX_FAILED',
                        error: error
                    });
                }
            );

    };

}

var syncAddAction = syncAddActionCreator(count);
var asyncAddAction = asyncAddActionCreator(count);

```

同样，`ActionCreator`是一个函数，它也很容易进行封装或者组合，比如：

```js

function doA(count) {

    return {
        type: 'DO_A',
        data: count
    };

}

function doB(count) {

    return function (dispatch, state) {

        dispatch({
            type: 'DO_B'
        });

        dispatch(doA(count));

    };

}

```


### Context

把上边所有的`dispatch` / `reducer` / `store`(`state`) 概念结合在一起，就是`Context`。`Context`的实例数据结构包括了以下内容：

```js

// Context instance
{

    // 归并(状态转移)函数
    reducer: function () {

    },

    // 实际上store可以是任何类似的值
    store: {

    },

    // 派发函数
    dispatch: function () {

    }

}

```

`Context`实例不是单例的，每个页面中应当包含有一个。 这样的设计是为了支持在服务器端使用`ei`。我们知道在服务器端，可以同时处理多个http请求。那么一定需要同时存在多个`Context`的实例，并且彼此相互隔离。

### Page

这是`ei`对页面的抽象。实际上，`Page`是Web网站最基本的概念。每次用户发起一个浏览页面的http请求，我们都应当为他响应一个页面。

即使是在spa(single page application，单页面应用)中，其为用户提供的基本感知还是一个基于多个页面的程序，只不过这些页面是虚拟的。

`ei`所提供的`Page`是同构的，它既可以在服务器端渲染成了一段html，也可以成为在spa应用中的一个虚拟页面。`ei`也提供了基础的spa支持。

### Resource

`Resource`是对系统外部资源的一种描述。一般来讲，我们会在`ActionCreator`中使用它，例如：


```js

var countResource = require('resource/count');

function asyncAddActionCreator(count) {

    return function (dispatch, state) {

        countResource
            .add(count)
            .then(function () {

                dispatch({
                    type: 'ADD_SUCCEED'
                });

            }, function () {

                dispatch({
                    type: 'ADD_FAILED'
                });

            });

    };

}

```

除了通过这种抽象，我们可以重复利用这些资源之外，更重要的是我们需要通过`Resource`的概念来解除服务器端与浏览器端对资源需求的差异。

我们都知道在浏览器上我们可以使用的资源是有限制的，一般是通过`http` / `socket`两种方式。而在服务器端，可使用的资源，比如 `redis` / `mongodb` / `mysql` / `file system` 以及各种各样的基于 http / tcp 的数据服务器。这是一个基本的事实是浏览器端与服务器端无法抹平的差异。但是我们的业务代码需要同时运行在浏览器端与服务器端，那么我们必须解决这个问题。

这里我们通过`Resource`的**依赖注入、控制反转**来解决这个问题，将对模块的依赖，转化为对一个资源标识符的依赖。举个例子：

```js

// 同构的 CountActionCreator

var Resource = require('ei').Resource;

function asyncAddActionCreator(count) {

    return function (dispatch, state) {

        Resource.get('count')
            .add(count)
            .then(function () {

                dispatch({
                    type: 'ADD_SUCCEED'
                });

            }, function () {

                dispatch({
                    type: 'ADD_FAILED'
                });

            });

    };

}

// CountResource on client

var Resource = require('ei').Resource;

Resource.register('count', {

    add: function (count) {

        return ajax(count);

    }

});

// CountResource on server

Resource.register('count', {

    add: function (count) {

        return mysql.query('DO WHATEVER YOU NEED');

    }

});

```


