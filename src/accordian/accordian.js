var pk = pk || {};
/**
Create a new accordian component from an unordered list element `<ul>` with the below structure:

HTML:

	<ul id='accordian'>
        <li>
            <h3 class='oui-content-header'>Content header</h3>
            <div class='oui-content'>
				Content to collapse
			</div>
        </li>
        <li>
            <h3 class='oui-content-header'>Content header</h3>
            <div class='oui-content'>
				Content to collapse
			</div>
        </li>
        <li>
            <h3 class='oui-content-header'>Content header</h3>
            <div class='oui-content'>
				Content to collapse
			</div>
        </li>		
    </ul>

Javascript:

	oui.accordian({
		element: document.getElementById('accordian'),
		animate: true,
		multiple: true
	});		
		
@class oui.accordian
@constructor
@param options {Object}
@param options.element {Object} DOM element to convert to component
@param [options.animate=true] {Boolean} Animate expand/collapse actions
@param [options.multiple=true] {Boolean} Allow multiple sections to be expanded simultaneously
@return Object {Object} Consisting of original DOM element (item `0`)
@chainable
*/

(function(pk) {
    oui.accordian = function(opt) {
        var el = opt.element,
            anim = opt.animate === false ? false : opt.animate || true,
            multiple = opt.multiple === false ? false : opt.multiple || true;

		oui.addClass(el, 'oui-accordian');
		
        function animHeight(tEl) {
            tEl.style.height = 'auto';
            var h = oui.layout(tEl).height;
            tEl.style.height = '0';
            setTimeout(function() {
                tEl.style.height = h + 'px';
            }, 10);
        }

        function doLayout(tEl) {
            for (var a = 0; a < el.children.length; a++) {
                // loop through each....

                var content = el.children[a].children[1];
                // if multiple set to false and node passed, hide all other nodes
                if (tEl && el.children[a] !== tEl && multiple === false) {
                    oui.removeClass(el.children[a], 'oui-show');
                }
                if (oui.hasClass(el.children[a], 'oui-show')) {
                    // show...if not already shown
                    if (parseInt(content.style.height, 0) === 0 || !content.style.height) {
                        if (anim) {
                            animHeight(content);
                        } else {
                            content.style.height = 'auto';
                        }
                    }
                } else {
                    // hide
                    content.style.height = '0';
                }
            }
        }
        oui.bindEvent('click', el, function(e) {
            if (!oui.hasClass(e.target, 'oui-content-header')) {
                return;
            }
            oui.toggleClass(e.target.parentNode, 'oui-show');
            doLayout(e.target.parentNode);
        });
        doLayout();
        return {
            0: el
        };
    };
    return pk;
})(pk);
