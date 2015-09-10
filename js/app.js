requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery-2.1.4.min',
    }
});

requirejs(['app/Main']);
