{%extends '../common/tpl/base.swig'%}

{%block head%}
{%endblock%}

{%block content%}
<div id="app">
{{content|raw}}
</div>
{%endblock%}

{%block script%}
<script>

var pack = {{pack|json|raw}};

require(['client/index'], function (index) {
    var pack = window.pack;
    index.bootstrap(pack);
    window.pack = null;
});

</script>
{%endblock%}
