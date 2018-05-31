define(function () {

    function isTouch(success, fail) {
        if (typeof window !== 'undefined') {
            let nav = window.navigator;
            Boolean('ontouchstart' in window || nav.maxTouchPoints > 0 || nav.msMaxTouchPoints > 0
                || (window.DocumentTouch && document instanceof DocumentTouch)) ? success() : fail();
        }
    }

    return isTouch;
});