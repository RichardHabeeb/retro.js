requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js/app'
    }
});

requirejs(['app/Main']);
