odoo.define('awesome_tshirt.WarningWidget', function (require) {
"use strict";

const core = require('web.core');
const registry = require('web.widget_registry');
const Widget = require('web.Widget');

const qweb = core.qweb;

const WarningWidget = Widget.extend({
    /**
     * @override
     */
    init: function (parent, record) {
        this._super.apply(this, arguments);
        this.record = record;
    },
    /**
     * @override
     */
    start: function () {
        this._render();
        return this._super.apply(this, arguments);
    },

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * Called each time a field changed.
     *
     * @param {Object} record
     */
    updateState: function (record) {
        this.record = record;
        this._render();
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _render: function () {
        this.$el.empty();
        if (!this.record.data.image_url) {
            this.$el.append(qweb.render('WarningWidget.NoImage'));
        }
        if (this.record.data.amount > 100) {
            this.$el.append(qweb.render('WarningWidget.AddPromo'));
        }
    },
});

registry.add('warning_widget', WarningWidget);

return WarningWidget;

});
