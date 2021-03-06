// Lite Modal https://github.com/DarylPinto/lite-modal
// -----------
// The light-weight vanilla JS modal script
// @author Daryl Pinto https://github.com/DarylPinto

// Decrease character count with some handy aliases
var d = document;
var wait = window.setTimeout;
var qs = d.querySelector.bind(d);

// Run callback on every element matched by selector
function qsaEach(selector, callback) {
	[].slice.call(d.querySelectorAll(selector)).forEach(callback);
}

// Add/Remove Class function since el.classList is not supported in IE9
function addClass(el, target_class){
	if(el.className.indexOf(target_class) == -1) el.className += ' '+target_class;
}
function removeClass(el, target_class){
	el.className = el.className.replace(new RegExp(target_class, 'g'), '').trim();
}

// Add CSS
var style = d.createElement('style');

var css = `
	#modal-bg{
		background-color:rgba(0,0,0,.7);
		position:fixed;
		top:0;
		left:0;
		transition:.2s opacity;
		height:100vh;
		width:100vw;
		z-index:100;
		display:none;
		justify-content: center;
		align-items: center;
	}

	#modal-bg.bg-fade{
		opacity:0
	}

	.lite-modal{
		display:none
	}

	#modal-bg.modal-on{
		display: flex;
	}
	
	.lite-modal.modal-on{
		display:block
	}`;

// Modal functions
module.exports = {
	init: function(closeCB){

		var _this = this;
		var modalFadeOutTime = 200;

		this.closeWithCB = function(){
			_this.close();
			window.setTimeout(function(){
				if(closeCB) closeCB();	
			}, modalFadeOutTime + 10);
		}

		//Prevent script from being initialized more than once
		if(qs('#modal-bg')) return false;

		style.textContent = css;
		d.head.appendChild(style);

		// Create modal background
		var bg = d.createElement('div');
		bg.id = 'modal-bg';
		bg.className = 'bg-fade';
		d.body.appendChild(bg);

		// Clicking modal background closes modal
		bg.addEventListener('click', function(e){
			_this.closeWithCB();
		});

		// Escape key closes modal
		d.addEventListener('keydown', function(e) {
			if(e.keyCode == 27) _this.closeWithCB();
		});

	},
	open: function(selector){
		qsaEach('#modal-bg,#modal-bg '+selector, function(el){
			addClass(el, 'modal-on');
		});
		wait(function(){
			removeClass(qs('#modal-bg'), 'bg-fade');
		}, 20);
	},

	close: function(){
		addClass(qs('#modal-bg'), 'bg-fade');
		wait(function(){
			qsaEach('#modal-bg,.lite-modal', function(el){
				removeClass(el, 'modal-on');
			});
			// Pause any modal media elements
			qsaEach('#modal-bg *', function(el){
				if(typeof el.pause == 'function') el.pause();
			});
		}, 310);
	}

}
