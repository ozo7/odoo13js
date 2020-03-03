odoo.define('awesome_tshirt.QuickOrderNavigation', function (require) {
"use strict";

const SystrayMenu = require('web.SystrayMenu');
const Widget = require('web.Widget');

const QuickOrderNavigation = Widget.extend({
    template: 'QuickOrderNavigation',
    sequence: 10,
    events: {
        'keydown .o_input': '_onInputKeydown',
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {KeyEvent} ev
     */
    _onInputKeydown: function (ev) {
        if (ev.which === $.ui.keyCode.ENTER) {
            const id = parseInt(this.$('.o_input').val(), 10);
            if (!_.isNaN(id)) {
                this.do_action({
                    res_id: id,
                    res_model: 'awesome_tshirt.order',
                    target: 'new',
                    type: 'ir.actions.act_window',
                    views: [[false, 'form']],
                    flags: {
                        mode: "readonly"
                    }
                });
            }
        }
    },
});

SystrayMenu.Items.push(QuickOrderNavigation);

});
