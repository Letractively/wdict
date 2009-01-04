//-----------------------------------------------------------
// BBcode Toolbar extension 
// Author: Quy NGUYEN-DAI <vnpenguin AT vnoss DOT org>
// Date: 20:52 30/11/2008
// Last update: 08:42 14/12/2008
// 13:13 20/12/2008 : add makeList() function for List
// 12:47 27/12/2008 : add prompt() & some validating functions
// 14:37 04/01/2009 : add Wiki prompt() code
//-----------------------------------------------------------

var clientPC  = navigator.userAgent.toLowerCase(); // Get client info
var is_macos  = navigator.appVersion.indexOf('Mac') != -1;
var is_gecko  = ((clientPC.indexOf('gecko')!=-1) && (clientPC.indexOf('spoofer')==-1) &&
                (clientPC.indexOf('khtml') == -1) && (clientPC.indexOf('netscape/7.0')==-1));
var is_safari = ((clientPC.indexOf('AppleWebKit')!=-1) && (clientPC.indexOf('spoofer')==-1));
var is_khtml  = (navigator.vendor == 'KDE' || ( document.childNodes && !document.all && !navigator.taintEnabled ));

/**
 * Format selection
 *
 * Apply tagOpen/tagClose to selection in textarea, use sampleText instead
 * of selection if there is none. Copied and adapted from phpBB
 *
 * @author phpBB development team
 * @author MediaWiki development team
 * @author Andreas Gohr <andi@splitbrain.org>
 * @author Jim Raynor <jim_raynor@web.de>
 * @author NGUYEN-DAI Quy <vnpenguin@vnoss.org>, customized for FluxBB, 23:44 13/12/2008
 */
function makeList (text) {
	if ( !text.match(/\r?\n/) )
		return text;
	
	var aLines = text.split(/\r?\n/);
	for (var i=0; i<aLines.length; i++){
		if(!aLines[i].match(/^\s*$/))
			aLines[i] = '[*]'+aLines[i]+'[/*]';
	}
	return aLines.join("\n");
}
function isValidUrl(url){
	return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}
function isValidEmail ( email ) {
	var res = false;
	if ( email.match(/^[\d\w_\.]+@[\w\d\_\-\.]+\.[a-z]{2,4}$/i) ) 
		res = true;
	return res;
}
function isValidColor(color){
	var res = false;
	if ( color.match(/^#[\d\w]{3}$/) || color.match(/^#[\d\w]{6}$/) || color.match(/^\w+$/) ) 
		res = true;
	return res;
}

function makePrompt (tag) {
	if (tag.match(/\[url\]/)){
		var sTxt = prompt("Enter your link: ","http://");
		if ( isValidUrl(sTxt) ) tag = '[url='+sTxt+']';
	}
	else if(tag.match(/\[color=?\]/)){
		var sTxt = prompt("Enter your color code/name: ","#0000FF");
		if ( isValidColor(sTxt) ) tag = '[color='+sTxt+']';
	}
	else if(tag.match(/\[quote\]/)){
		var sTxt = prompt("Enter the name for your quoted text: ");
		if ( sTxt != '' ) tag = '[quote='+sTxt+']';
	}
	else if(tag.match(/\[email\]/)){
		var sTxt = prompt("Enter E-mail address: ","you@vnoss.org");
		if ( isValidEmail(sTxt) ) tag = '[email='+sTxt+']';
	}
	else if(tag.match(/\[wiki\]/)){
		var sTxt = prompt("Enter language code for Wikipedia (en,fr,vi,...): ","en");
		if ( sTxt.match(/^\w{2}$/) ) tag = '[wiki='+sTxt+']';
	}
	return tag;
}
function insertTags(tagOpen,tagClose,sampleText) {
	//var txtarea = document.getElementById(edid);

	// Begin of customized code of NGUYEN DAI Quy -----------------------------
	var elems = document.getElementsByTagName('textarea');
	var i;
	for (i = 0; i != elems.length; i++)
		if (elems[i].name == 'req_message' || elems[i].name == 'signature')
			var txtarea = elems[i];
	var tagOpen_ = tagOpen.replace(/[\[\]]/g,'');
	if (! tagOpen.match(/\[.+\]/)) tagOpen  = '[' + tagOpen  + ']';
		
	if ( tagClose == '' ){
		var res = tagOpen_.match(/(.+)=/);
		if (res)
			tagClose = '[/'+res[1]+']';
		else
			tagClose = '[/'+tagOpen_+']';
	} else {
		if (! tagClose.match(/\//)) tagClose = '/' + tagClose ;
		if (! tagClose.match(/\[.+\]/)) tagClose = '[' + tagClose + ']';
	}
	// End of customized code of NGUYEN DAI Quy -----------------------------

	tagOpen = makePrompt(tagOpen);
	
	if (tagOpen.match(/list/i) && !tagOpen.match(/\n/)) tagOpen = tagOpen+"\n";
	if (tagClose.match(/list/i) && !tagClose.match(/\n/)) tagClose = "\n"+tagClose;
	
	// IE
	if(document.selection  && !is_gecko) {
		var theSelection = document.selection.createRange().text;
		var replaced = true;
		if(!theSelection){
			replaced = false;
			theSelection=sampleText;
		}
		txtarea.focus();

		// This has change
		var text = theSelection;
		if(theSelection.charAt(theSelection.length - 1) == " "){// exclude ending space char, if any
			theSelection = theSelection.substring(0, theSelection.length - 1);
			r = document.selection.createRange();
			r.text = tagOpen + theSelection + tagClose + " ";
		} else {
			r = document.selection.createRange();
			r.text = tagOpen + theSelection + tagClose;
		}
		if(!replaced){
			r.moveStart('character',-text.length-tagClose.length);
			r.moveEnd('character',-tagClose.length);
		}
		r.select();
	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		replaced = false;
		var startPos = txtarea.selectionStart;
		var endPos   = txtarea.selectionEnd;
		if(endPos - startPos){ replaced = true; }
		var scrollTop=txtarea.scrollTop;
		var myText = (txtarea.value).substring(startPos, endPos);
		if(!myText) { myText=sampleText;}
		if(tagOpen.match(/list/i)) myText = makeList(myText);
		if(myText.charAt(myText.length - 1) == " "){ // exclude ending space char, if any
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
		} else {
			subst = tagOpen + myText + tagClose;
		}
		txtarea.value = txtarea.value.substring(0, startPos) + subst +
			txtarea.value.substring(endPos, txtarea.value.length);
		txtarea.focus();

		//set new selection
		if(replaced){
			var cPos=startPos+(tagOpen.length+myText.length+tagClose.length);
			txtarea.selectionStart=cPos;
			txtarea.selectionEnd=cPos;
		}else{
			txtarea.selectionStart=startPos+tagOpen.length;
			txtarea.selectionEnd=startPos+tagOpen.length+myText.length;
		}
		txtarea.scrollTop=scrollTop;
	// All others
	} else {
		var copy_alertText=alertText;
		var re1=new RegExp("\\$1","g");
		var re2=new RegExp("\\$2","g");
		copy_alertText=copy_alertText.replace(re1,sampleText);
		copy_alertText=copy_alertText.replace(re2,tagOpen+sampleText+tagClose);

		if (sampleText) {
			text=prompt(copy_alertText);
		} else {
		text="";
		}
		if(!text) { text=sampleText;}
		text=tagOpen+text+tagClose;
		//append to the end
		txtarea.value += "\n"+text;

		// in Safari this causes scrolling
		if(!is_safari) {
			txtarea.focus();
		}
	}
	// reposition cursor if possible
	if (txtarea.createTextRange){
		txtarea.caretPos = document.selection.createRange().duplicate();
	}
}

