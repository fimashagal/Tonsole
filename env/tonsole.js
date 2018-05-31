"use strict";
define(function (require) {
    const isTouch = require('./is.touch');
    const typeOf = require('./type.of');

    function Tonsole() {

    }

    Tonsole.prototype.initialize = function(){
        isTouch(() => this.injectConsole(), () => this.throwException());
        return this;
    };

    Tonsole.prototype.injectConsole = function(){
        this.container = document.createElement('div');
        this.input = document.createElement('input');
        this.output = document.createElement('output');
        this.input.type = "text";
        this.container.classList.add('tonsole');
        this.input.classList.add('tonsole-input');
        this.output.classList.add('tonsole-output');
        this.output.textContent = "...";
        this.container.appendChild(this.input);
        this.container.appendChild(this.output);
        document.body.appendChild(this.container);

        this.follow();
        return this;
    };

    Tonsole.prototype.follow = function(){
        this.follower = event => {
            let value = event.target.value;
            if(/(userAgent)+|(ua)+/g.test(value)){
                this.log(window.navigator.userAgent);
            }
            if(/(window)+|(self)+/g.test(value)) {
                this.log(Object.keys(window).join("\n"));
            }
            if(/(url)+/g.test(value)) {
                this.log(document.location.href);
            }
            if(!/(window)+|(userAgent)+|(ua)+|(url)+|(self)+/g.test(value)) {
                value = window[value];
                if(typeOf(value) === 'object'){
                    this.log(JSON.stringify(value));
                }
                if(typeOf(value) === 'array'){
                    this.log(value.join("\n"));
                }
                if(/(number)+|(self)+|(string)+|(boolean)+|(function)+|(null)+/g.test(typeOf(value))){
                    this.log(`${value}`);
                }
            }

            if(typeOf(value) === "undefined" || value === "") this.clear();
        };
        for(let eventName of ['input', 'focus', 'blur']) this.input.addEventListener(eventName, this.follower);
        this.input.focus();
    };

    Tonsole.prototype.clear = function(){
        this.output.innerText = "...";
    };

    Tonsole.prototype.log = function(msg = ""){
        if(msg === "") return;
        this.output.innerText = msg;
    };

    Tonsole.prototype.throwException = function(){
        console.warn('Tonsole: this device not need special console, u can use browser console');
        return Object.create(null);
    }; 
    
    return Tonsole;
});
