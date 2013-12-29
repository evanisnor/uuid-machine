requirejs.config({
    baseUrl: '.',
    paths: {
        lodash : 'bower_components/lodash/dist/lodash.min',
        ractive: 'bower_components/ractive/build/Ractive.min'
    },
    packages: [
        {
            name: 'domReady',
            location: 'bower_components/requirejs-domready',
            main: 'domReady'
        },
        {
            name: 'text',
            location: 'bower_components/requirejs-text',
            main: 'text'
        },
        {
            name: 'css',
            location: 'bower_components/require-css',
            main: 'css'
        }
    ],
    map: {
        '*': {
            'css': 'bower_components/require-css/css'
        }
    }
});

requirejs(['domReady!', 'view/main/main'],
    function(doc, MainView) {
        new MainView('#view-main');
    }
);