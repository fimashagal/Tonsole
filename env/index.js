"use strict";
define(function (require) {

    const req = {
        Tonsole(Factory = require('./tonsole')) {
            return Object.create(Factory.prototype);
        }
    };

    let Tonsole = req.Tonsole();

    main();

    function main() {
        (Tonsole.initialize)();
    }

});
