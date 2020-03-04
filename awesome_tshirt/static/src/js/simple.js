odoo.define('awesome_tshirt.Simple', function (require) {
    "use strict";

    const Class = require('web.Class');

    const Testing = Class.extend({
        init: function(){
            console.log('>>> This is Testing. Hello.');
            alert("hello.");
        }
    })

    // NO -- can we trigger the initialization of the module from the execution within the function here that defines the module? => Error: some modules (namely this here) could not be started
    // const Simple2 = require('awesome_tshirt.Simple');
    // const oSimple2 = new Simple2();


    return Testing;

});

// NO -- can we trigger the initialization of the module above by requiring it from javascript execution environment here? => Error: function 'require' not defined
// const Simple2 = require('awesome_tshirt.Simple');
// const oSimple2 = new Simple2();




odoo.define('awesome_tshirt.Simple2', function (require) {
    "use strict";

    // We define a seconde model to test loading the first one above

    //const Simple2 = require('awesome_tshirt.Simple');
    //const oSimple2 = new Simple2();

    // OK -- trigger here => Works!! :D

});