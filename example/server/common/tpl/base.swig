<!DOCTYPE html>
<html>
<head>
    {% spaceless %}
    <meta charset="UTF-8">
    <title>Todo</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="{{feRoot|escape}}/src/client/index.styl">
    {%block head%}{%endblock%}
    {% endspaceless %}
</head>
<body>

{%spaceless%}
{%block content%}{%endblock%}
{%endspaceless%}
<script src="{{feRoot|escape}}/build/esl.js"></script>
{%block commonscript%}
<script>
require.config({

    baseUrl: '{{feRoot|escape}}/src',

    paths: {
        'underscore': '../bower_components/underscore/underscore',
        'react': '../bower_components/react/react',
        'es6-promise': '../bower_components/es6-promise/promise',
        'axios': '../bower_components/axios/dist/axios.amd',
        'immutable': '../bower_components/immutable/dist/immutable',
        'ei-logger': '../bower_components/ei-logger/dist/ei-logger'
    }

});
</script>
{%endblock%}
{%block script%}{%endblock%}
</body>
</html>
