requirejs.config({baseUrl:".",paths:{lodash:"vendor/lodash.min",ractive:"vendor/Ractive"},packages:[{name:"domReady",location:"vendor",main:"domReady"},{name:"text",location:"vendor",main:"text"},{name:"css",location:"vendor/require-css",main:"css"}],map:{"*":{css:"vendor/require-css/css"}}}),requirejs(["domReady!","view/main/main"],function(e,t){new t("#view-main")});