odoo.define('awesome_tshirt.OlafTest', function (require) {
    "use strict";


    const Widget = require('web.Widget');

    const MyCounter = Widget.extend({
        template: 'olaftest.template',
        events: {
            'click button': '_onClick',
        },
        init: function (parent, value) {
            this._super(parent);
            this.count = value;
            console.log('>>> I am MyCounter.');
        },
        _onClick: function () {
            this.count++;
            this.$('.val').text(this.count);
        },
    });

    return MyCounter;

});