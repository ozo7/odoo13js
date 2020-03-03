odoo.define('awesome_tshirt.ChartWidget', function (require) {
"use strict";

/**
 * This files defines a Chart widget to display the proportions of t-shirts sold
 * for each size.
 */

const Widget = require('web.Widget');

const ChartWidget = Widget.extend({
    tagName: 'canvas',
    jsLibs: ['/awesome_tshirt/static/lib/chart.js/Chart.js'],

    /**
     * @override
     */
    init: function (parent, ordersBySize) {
        this._super.apply(this, arguments);
        this.sizes = ['s', 'm', 'l', 'xl', 'xxl'];
        this.ordersBySize = ordersBySize;
    },
    /**
     * @override
     */
    start: function () {
        console.log('>>> This is chart_widget.js');
        this._renderChart();
        return this._super.apply(this, arguments);
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _renderChart: function () {
        new Chart(this.el, {
            type: 'pie',
            data: {
                labels: this.sizes,
                datasets: [{
                    label: 'Size',
                    data: _.map(this.sizes, (s) => this.ordersBySize[s] || 0),
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                onClick: this._onChartClicked.bind(this),
            },
        });
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     * @param {Object[]} chartElements
     */
    _onChartClicked: function (ev, chartElements) {
        if (chartElements && chartElements.length) {
            this.trigger_up('open_orders', {
                size: this.sizes[chartElements[0]._index],
            });
        }
    },
});

return ChartWidget;

});
