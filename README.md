uuid-machine
============

Uuid Generator based on Require.js and Ractive.js.

[See it in action!](http://leadhead9.github.io/uuid-machine/)

Install
--------------
After cloning, install the npm dependencies and build with grunt. This will create a bin directory and install all bower dependencies.

```
$ npm install && grunt build
```

If you would like to run uuid-machine from the src directory, where the javascript has not been minified, execute the following command to download all bower dependencies:

```
$ (cd src && bower install)
```

Running the following grunt command will build the app and copy the contents of the bin directory to the gh-pages branch:

```
$ grunt publish
```