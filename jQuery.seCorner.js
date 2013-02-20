/*
 * jQuery seCorner plugin: a jquery plugin for corner use in SE
 * Description: support IE7+, Firefox, Chrome
 * Author: Jing XIAO
 * Dual licensed under the MIT and GPL licenses:
 */

(function($){
  var style = document.createElement('div').style,
		moz = style['MozBorderRadius'] !== undefined, // firefox
		webkit = style['WebkitBorderRadius'] !== undefined, // webkit core (Chrome)
		radius = style['borderRadius'] !== undefined || style['BorderRadius'] !== undefined, // IE9
		LT = false, RT = false, LB = false, RB = false, // direction
		L=T=R=B='none';
		
	$.fn.seCorner = function(options) {
		var opts = $.extend({}, $.fn.seCorner.defaults, options),
			dir = opts['direction'],
			$this = $(this), 
			id = $this.attr('id');
		if (!$this.get(0)) return;
		id = id ? id : 'sc_' + parseInt(1000*Math.random());
		dir = dir.match(/^[1|0]{4}$/) ? dir : $.fn.seCorner.defaults['direction'];
		var i = parseInt(dir, 2); i = '/'+i+'/';
		if ('/1/3/5/7/9/11/13/15/'.indexOf(i) >= 0) {LB = true;} 
		if ('/2/3/6/7/10/11/14/15/'.indexOf(i) >= 0) {RB = true;}
		if ('/4/5/6/7/12/13/14/15/'.indexOf(i) >= 0) {RT = true;} 
		if ('/8/9/10/11/12/13/14/15/'.indexOf(i) >= 0) {LT = true;}
		L=$this.css('border-left-width'),T=$this.css('border-top-width'),R=$this.css('border-right-width'),B=$this.css('border-bottom-width');
		$this.css({'background-color':opts['bgColor']});
		var w = $this.width(),
		h =  $this.height(),//seRp($this.css('height')), 
		bw = seRp(opts['borderWidth']); bw = isNaN(bw) ? 1 : bw; // border width
		w = $this.css('display') == 'none' ? 'auto' : w; // if this object is hidden, the width() method will incorrect.
		return this.each(function(){	
			$this.css({'border-left-color':opts['borderColor'], 'border-top-color':opts['borderColor'],'border-right-color':opts['borderColor'],'border-bottom-color':opts['borderColor']});
			if (moz||webkit||radius) {
				if (LT) {$this.css(radius ? 'border-top-left-radius' : moz ? '-moz-border-radius-topleft' : '-webkit-border-top-left-radius',opts['radius'] );}
				if (RT) {$this.css(radius ? 'border-top-right-radius' : moz ? '-moz-border-radius-topright' : '-webkit-border-top-right-radius', opts['radius'] );}
				if (LB) {$this.css(radius ? 'border-bottom-left-radius' : moz ? '-moz-border-radius-bottomleft' : '-webkit-border-bottom-left-radius', opts['radius'] );}
				if (RB) {$this.css(radius ? 'border-bottom-right-radius' : moz ? '-moz-border-radius-bottomright' : '-webkit-border-bottom-right-radius', opts['radius'] );}
				if (bw <= 1) {
					$this.css({'border-left-width':L, 'border-top-width':T, 'border-left-right':R, 'border-left-bottom':B });
				} else {
					$this.css({'border':bw +'px solid ' + opts['borderColor']});
				}
			} else { 
				var	mw = seRp($this.css('margin-left'))*1 + seRp($this.css('margin-right'))*1; mw = isNaN(mw) ?  0 : mw, // margin width
					pw = seRp($this.css('padding-left'))*1 + seRp($this.css('padding-right'))*1; pw = isNaN(pw) ? 0 : pw, // padding width
					cd = $('<div class="'+id+'_seCorner" style="display:block;font-size: 1px; overflow: hidden;height:1px"></div>'),
					cd1 = cd.clone().css({'margin': '0 5px', 'background-color': opts['borderColor'] }),
					cd2 = cd.clone().css({'margin': '0 3px',  'background-color': opts['bgColor'], 'border-left': 1 +'px solid '+ opts['borderColor'], 'border-right': 1 +'px solid '+ opts['borderColor']}),
		       		cd3 = cd2.clone().css({'margin':'0 2px'});
					cd4 = cd2.clone().css({'margin':'0 1px'});
					cd5 = '', 
					cdr2 = cd.clone().css({'margin': '0 3px', 'background-color': opts['borderColor'] }),
					cdr3 = cdr2.clone().css({'margin': '0 2px'}),
					cdr4 = cdr2.clone().css({'margin': '0 1px'}),
					cdr5 = cdr2.clone().css({'height': (bw - 5)>0 ? (bw-5) :0, 'margin':'0 0'});		
				$this.css({'margin': 0});
			
				switch (bw) {
					case '1':break;
					case '2':cd2 = cdr2;break;
					case '3':cd2 = cdr2;cd3 = cdr3;break;
					case '4':cd2 = cdr2;cd3 = cdr3;cd4 = cdr4;break;
					default: cd2 = cdr2;cd3 = cdr3;cd4 = cdr4;cd5 = cdr5;break;
				}
				var LN=1,RN=1, cd1_b=cd1.clone(), cd2_b = cd2.clone(), cd3_b = cd3.clone(), cd4_b = cd4.clone();//alert('L:'+L+' R:'+R);
				if (seRp(L) && !isNaN(seRp(L))) {LN=seRp(L);L = bw;} else {L='1px'; cd1.css({'border-left':'0'}); cd2.css({'border-left':'0'}); cd3.css({'border-left':'0'}); cd4.css({'border-left':'0'}); }
				if (seRp(R) && !isNaN(seRp(R))) {RN=seRp(R);R = bw;} else {R='1px'; cd1.css({'border-right':'0'}); cd2.css({'border-right':'0'}); cd3.css({'border-right':'0'}); cd4.css({'border-right':'0'});}	
				cd1.css({'margin':(RT?'0 5px ':'0 0 ') + (LT?'0 5px':'0 0')}); cd2.css({'margin':(RT?'0 3px ':'0 0 ') + (LT?'0 3px':'0 0')});cd3.css({'margin':(RT?'0 2px ':'0 0 ') + (LT?'0 2px':'0 0')});cd4.css({'margin':(RT?'0 1px ':'0 0 ') + (LT?'0 1px':'0 0')});
				cd1_b.css({'margin':(RB?'0 5px ':'0 0 ') + (LB?'0 5px':'0 0')}); cd2_b.css({'margin':(RB?'0 3px ':'0 0 ') + (LB?'0 3px':'0 0')});cd3_b.css({'margin':(RB?'0 2px ':'0 0 ') + (LB?'0 2px':'0 0')});cd4_b.css({'margin':(RB?'0 1px ':'0 0 ') + (LB?'0 1px':'0 0')});
				
				$this.css({'border-left-width':L, 'border-top-width':0, 'border-right-width':R, 'border-bottom-width':0 });
				//w = seRp($this.get(0).style.width);//currentStyle
				var cd5_b = '';
				if (seRp(T) && !isNaN(seRp(T))) { cd1.insertBefore(this);cd2.insertBefore(this);cd3.insertBefore(this);cd4.insertBefore(this); if (cd5 !== '') {cd5.insertBefore(this);} }
				if (seRp(B) && !isNaN(seRp(B))) { cd1_b.insertAfter(this);cd2_b.insertAfter(this);cd3_b.insertAfter(this);cd4_b.insertAfter(this); if (cd5 !== '') { cd5_b = cd5.clone(); cd5_b.insertAfter(this);} }
			
				var fw= isNaN(w) || w == 0 ? 'auto' : w*1+pw*1, topw =LT+RT, bow=LB+RB; //alert('w:'+w+' fw:'+fw+' pw:'+pw+' LN:'+LN+' RN:'+RN+' LT:'+LT+' RT:'+RT+' LB:'+LB+' RB:'+RB+' topw:'+topw+' bow:'+bow); //+LN*1+RN*1

				cd1.width(fw-5*topw);cd2.width(fw-3*topw);cd3.width(fw-2*topw);cd4.width(fw-topw);if(cd5){cd5.width(fw);} 
				cd1_b.width(fw-5*bow);cd2_b.width(fw-3*bow);cd3_b.width(fw-2*bow);cd4_b.width(fw-bow); if(cd5_b){cd5_b.width(fw);} 
				$this.css({'overflow':'hidden', 'width':fw, 'height': h-8-seRp(T)-seRp(B)}); //'height':h-8-seRp(T)-seRp(B)		
			}
		});
	};
	
	function seRp (s) {
		return isNaN((s.toUpperCase()).replace('PX','')) ? 0 : (s.toUpperCase()).replace('PX','');
	}
	
	$.fn.seCorner.defaults = {
		'borderWidth': '1px', 
		'radius': '10px',
		'borderColor': '#CDCDCD',
		'bgColor': '#FFF',
		'direction' : '1111'     //  1111: left-top | right-top | left-bottom | right-bottom
	};
})(jQuery)
