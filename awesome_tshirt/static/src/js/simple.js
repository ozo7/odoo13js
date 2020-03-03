odoo.define('awesome_tshirt.Simple', function (require) {
    "use strict";

    const Class = require('web.Class');

    const Testing = Class.extend({
        init: function(){
            console.log('>>> This is Testing. Hello.');
            alert("hello.");
        }
    })

    return Testing;

});