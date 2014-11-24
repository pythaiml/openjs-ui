var $ui = $ui || {};
/**
Create a new toggle control

HTML:

	<input id='toggle' />

Javascript:

	$ui.toggle({
		element: document.getElementById('toggle'),
		options: [{
			value: true,
			name: 'yes'
		}, {
			value: false,
			name: 'no'
		}, {
			value: 'other',
			name: 'other'
		}],
		value: false
	});
	
@class $ui.toggle
@constructor
@param options {Object}
@param options.element {Object} DOM element to convert to control
@param options.options {Object} Object array of control options
@param options.options.value {String} Option value
@param options.options.name {String} Option name (displayed label)
@param [options.value=0] {String} Value of initially selected option, defaults to the attribute value set on the passed element, or `0`
@param [options.name=ui-toggle-RandInt] {String} Name of underlying input control, defaults to the attribute value set on the passed element, or `ui-toggle-RandInt`
@param [options.tabindex=0] {Number} Tabindex of control, defaults to the attribute value set on the passed element, or `0`
@param [options.disabled=false] {Boolean} Disabled state of control, defaults to the attribute value set on the passed element, or `false`
@param [options.listeners] {Object} Object array of event listeners to bind to underlying input(s)
@return Object {Object} Consisting of original DOM element (item `0`) and class methods (see below)
@chainable
*/
(function($ui) {
    $ui.toggle = function(opt) {
        var el = opt.element,
            options = opt.options || [],
            // more complex as can take true/false values
            inputValue = opt.value !== undefined ? opt.value : $ui.attribute(el, 'value') !== undefined ? $ui.attribute(el, 'value') : options[0].value,
            listeners = opt.listeners === undefined ? {} : opt.listeners,
            inputDisabled = (opt.disabled || el.getAttribute('disabled')) ? 'disabled' : '',
            inputName = opt.name || el.getAttribute('name') || 'ui-toggle-' + $ui.getRand(1, 999),
            inputTabIndex = opt.tabindex || el.getAttribute('tabindex') || 0;

        if (!options) {
            return;
        }

        var tpl = "<div class='ui-toggle " + (inputDisabled ? 'ui-disabled' : '') + "' tabindex='" + inputTabIndex + "'>\
			<input type='hidden' name = '" + inputName + "' value='" + inputValue + "'/>\
			<div class='ui-toggle-indicator' style='width:" + (100 / options.length) + "%'></div>\
		</div>";

        tpl += "";
        el.innerHTML = '';
        el = $ui.replaceEl(el, tpl);

        var optionEl = [];
        for (var o = 0; o < options.length; o++) {
            var oEl = $ui.createEl("<div class='ui-option' style='width:" + (100 / options.length) + "%' data-value='" + options[o].value + "'>" + options[o].name + "</div>");
            el.appendChild(oEl);
            optionEl.push(oEl);
        }

        var inputEl = el.children[0],
            indicatorEl = el.children[1];
        /**
        Gets or sets control value
        @method val
        @param [value] {String} Value to set
        @return {String} Returns current value
        */

        /**
        Gets or sets control disabled state
        @method disabled
        @param [boolean] {Boolean} Disabled state
        @return {Boolean} Returns disabled state
        */
        var obj = {
            0: el,
            val: function(val) {
                if (val === undefined) {
                    return inputEl.value;
                }
                val = val.toString() || options[0].value.toString();
                for (var o = 0; o < options.length; o++) {
                    if (options[o].value.toString() === val) {
                        indicatorEl.style.left = parseInt(o, 0) * 100 / options.length + '%';
                        inputEl.value = val;
                        $ui.addClass(optionEl[o], 'ui-selected');
                    } else {
                        $ui.removeClass(optionEl[o], 'ui-selected');
                    }
                }
            },
            disabled: function(val) {
                if (val !== undefined) {
                    $ui.toggleClass(el, 'ui-disabled', val);
                    $ui.attribute(inputEl, 'disabled', val);
                }
                return $ui.attribute(inputEl, 'disabled');
            }
        };
        obj.val(inputValue);

        function clickOpt(e) {
            obj.val($ui.attribute(e.target, 'data-value'));
        }
        for (o = 0; o < options.length; o++) {
            $ui.bindListeners(listeners, optionEl[o]);
            if (!inputDisabled) {
                $ui.bindEvent('click', optionEl[o], clickOpt);
            }
        }
        return obj;
    };
    return $ui;
})($ui);
