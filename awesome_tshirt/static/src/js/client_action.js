odoo.define('awesome_tshirt.Executioner', function (require) {
    "use strict";

    const AbstractAction = require('web.AbstractAction');
    const Widget = require('web.Widget');

    const Button1 = Widget.extend({
        template: 'button1of3',
        events: {
            'click button': '_onClick',
        },
        init: function (parent) {
            this._super(parent);
            console.log('>>> I am Button1.');
        },
        _onClick: function () {
            console.log('>>> Button1 clicked.');
            // $receivingDiv.innerHTML = "this is button 1.";
            $("div#receivingDiv").html("this is button 1.");
        }
    });

    const Button2 = Widget.extend({
        template: 'button2of3',
        events: {
            'click button': '_onClick',
        },
        init: function (parent) {
            this._super(parent);
            console.log('>>> I am Button2.');
        },
        _onClick: function () {
            console.log('>>> Button2 clicked.');
            // $receivingDiv.innerHTML = "this is button 1.";
            $("div#receivingDiv").html("this is button 2.");
        }
    });

    const Button3 = Widget.extend({
        template: 'button3of3',
        events: {
            'click button': '_onClick',
        },
        init: function (parent) {
            this._super(parent);
            console.log('>>> I am Button3.');
        },
        _onClick: function () {
            console.log('>>> Button3 clicked.');
            // $receivingDiv.innerHTML = "this is button 1.";
            $("div#receivingDiv").html("this is button 3.");
        }
    });


    const ClientAction = AbstractAction.extend({
        // OK -- is this working and actually triggered by the menu item?

    /**
     * @override
     */
    start: function () {
        console.log('>>> I am Executioner from client_action');
        //const Testing = require('awesome_tshirt.Simple');
        //const oTesting = new Testing();

        //this.do_more(); // just adding a button to the page
        this.create3Buttons();

    },

    create3Buttons: function() {
        // putting a changing area on the web page
        let $receivingDiv
        if ($("div#receivingDiv").length == 0){
            $receivingDiv = $('<div id="receivingDiv"></div/>');
            $receivingDiv.appendTo($("body"));
        } else {
            $receivingDiv = $("div#receivingDiv");
        }
        $("div#receivingDiv").html("I am here.");

        const oButton1 = new Button1();
        const oButton2 = new Button2();
        const oButton3 = new Button3();
        oButton1.appendTo($('div.o_action_manager'));
        oButton2.appendTo($('div.o_action_manager'));
        oButton3.appendTo($('div.o_action_manager'));
    },

    do_more: function () {
        //alert('doing more.');
        const $inputButton = $('<input type="button" value="new button" />');
        $inputButton.prependTo($("body"));
    }

    });

    // do not forget to register the new module in the Odoo framework
    const core = require('web.core');
    core.action_registry.add('awesome_tshirt.Executioner', ClientAction);



});