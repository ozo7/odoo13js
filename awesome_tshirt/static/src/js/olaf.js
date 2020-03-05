odoo.define('awesome_tshirt.odashboard', function (require) {
    "use strict";

    const ChartWidget = require('awesome_tshirt.ChartWidget');

    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');
    const fieldUtils = require('web.field_utils');

    const MyCounter = require('awesome_tshirt.MyCounter');

    const _t = core._t;
    const qweb = core.qweb;

    const oDashboard = AbstractAction.extend({
        hasControlPanel: true,
        events: {
            'click .o_new_orders_btn': '_onOpenNewOrders',
            'click .o_customers_btn': '_onOpenCustomers',
            'click .o_cancelled_orders_btn': '_onOpenCancelledOrders',
        },
        custom_events: {
            // This function catches the "bubbled up" event that looks for this function. The event listener can be implemented on any component that this object here has, like the ChartWidget.
            open_orders: '_onOpenOrders',
        },


        /**
         * @override
         */
        start: function () {
            console.log("oDashboard start");
            const oCounter = new MyCounter();
            oCounter.appendTo($('body'));
            // before rendering we must guarantee that the data has been fetched from the backend.
            return Promise.all([
                // Olaf: this is urgently needed and needs to complete before other things happen:
                this._super.apply(this, arguments),
                // Olaf: if this is not put here, the error is that the widget passed to the rendering qweb object is then undefined!
                this._loadStatistics(),
            ]).then(() => {
                this.$('.o_cp_buttons').append(qweb.render('o3buttons'));
                this.$('.o_content').html(qweb.render('oNumbers', { widget: this }));
                // TODO: continue here
                const chart = new ChartWidget(this, this.stats.orders_by_size);
                chart.appendTo(this.$('.o_fancy_chart'));
            });
        },
        /**
         * Called when the dashboard will be restored (e.g. by coming back using the
         * breadcrumb).
         *
         * @override
         */
        do_show: function () {
            console.log("oDashboard do_show");
            // return this._reload();
        },
        /**
         * Called each time the dashboard is inserted into the DOM. Reloads and
         * re-renders the dashboard every 30s.
         *
         * @override
         */
        on_attach_callback: function () {
            console.log("oDashboard on_attach");
            // this._reloadInterval = setInterval(this._reload.bind(this), 30000);
        },
        /**
         * Called each time the dashboard is detached from the DOM. Stops reloading
         * the dashboard every 30s if it is no longer into the DOM.
         *
         * @override
         */
        on_detach_callback: function () {
            console.log("oDashboard on_detach");
            // clearInterval(this._reloadInterval);
        },

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------
        /**
        * @private
        * @returns {Promise} resolved when the statistics have been fetched
        */
        _loadStatistics: function () {
            return this._rpc({
                route: '/awesome_tshirt/statistics',
            }).then((stats) => {
                console.log(stats);
                // stats.average_time = fieldUtils.format.float_time(stats.average_time);
                this.stats = stats;
            });
        },
        /**
         * Opens the orders of t-shirt of the given size.
         *
         * @private
         * @param {OdooEvent} ev
         * @param {string} ev.data.size
         */
        _onOpenOrders: function (ev) {
            console.log('who clicked me?');
            let my_size = ev.data.size.toLowerCase();
            console.log(ev);
            console.log(my_size);
            return this.do_action({
                name: 'someone called me?',
                res_model: 'awesome_tshirt.order',
                type: 'ir.actions.act_window',
                views: [[false, 'list'], [false, 'form']],
                domain: [['size', '=', my_size]]
            });
        },

        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
        * @private
        */
        _onOpenCustomers: function () {
            this.do_action('base.action_partner_customer_form');
        },
        /**
        * @private
        */
        _onOpenCancelledOrders: function () {
            return this.do_action({
                name: 'olaf cancelled orders',
                res_model: 'awesome_tshirt.order',
                type: 'ir.actions.act_window',
                views: [[false, 'list'], [false, 'form']],
                domain: [
                    ['state', '=', 'cancelled'],
                    ['create_date', '>=', '2019-12-24']
                ],
            });
        },
        /**
        * @private
        */
        _onOpenNewOrders: function () {
            return this.do_action({
                name: 'olaf new orders',
                res_model: 'awesome_tshirt.order',
                type: 'ir.actions.act_window',
                views: [[false, 'list'], [false, 'form']],
                domain: [
                    ['create_date', '>=', '2019-12-24'],
                    ['state', '=', 'new']
                ],
            });
        },


    });

    core.action_registry.add('awesome_tshirt.odashboard', oDashboard);

    return oDashboard;

});
