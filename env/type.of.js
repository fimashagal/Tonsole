define(function () {

    function typeOf(obj) {
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    }

    return typeOf;
});