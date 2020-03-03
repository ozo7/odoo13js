odoo.define('awesome_tshirt.MyCounter', function (require) {
"use strict";

/**
 * This file defines the MyCounter widget, displaying a counter with two buttons
 * allowing to increment and decrement it.
 */

const Widget = require('web.Widget');

const MyCounter = Widget.extend({
    template: 'MyCounter',
    events: {
        'click .o_decrement': '_onDecrement',
        'click .o_increment': '_onIncrement',
    },

    /**
     * @override
     */
    init: function () {
        console.log ('>>> I am counter - init.');
        this.value = 0;
        this._super.apply(this, arguments);
    },

    start: function () {
        console.log ('>>> I am counter - start');
    },



    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * Decrement the counter and re-render the widget.
     *
     * @private
     */
    _onDecrement: function () {
        this.value--;
        this.renderElement();
    },
    /**
     * Increment the counter and re-render the widget.
     *
     * @private
     */
    _onIncrement: function () {
        this.value++;
        this.renderElement();
    },
});

const core = require('web.core');
core.action_registry.add('awesome_tshirt.my_counter', MyCounter);

return MyCounter;

});
