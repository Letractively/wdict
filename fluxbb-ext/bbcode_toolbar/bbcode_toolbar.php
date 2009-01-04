<?php
/* -----------------------------------------------------------
	BBcode Toolbar extension based on "Easy BBcode" of X-DOS
	Author: Quy NGUYEN-DAI <vnpenguin AT vnoss DOT org>
	Date: 23:16 01/12/2008
	Update: 22:42 13/12/2008 
		14:31 04/01/2009 : add Wiki button
-------------------------------------------------------------*/
function show_bbcode_toolbar($fld){
?>
<!-- BBcode Toolbar extension -->
<div class="txt-set">
	<label for="fld<?php echo $fld;?>"><span></span></label>
	<div class="txt-input"><span class="fld-input">
		<input id="button_bold" type="button" value="B" name="B" title="Bold" 
			onclick="insertTags('b','','')" class="bbcode_toolbar"/>
		<input id="button_italic" type="button" value="I" name="I" title="Italic" 
			onclick="insertTags('i','','')" class="bbcode_toolbar"/>
		<input id="button_underline" type="button" value="U" name="U" title="Underline" 
			onclick="insertTags('u','','')" class="bbcode_toolbar"/>
		&bull;
		<input id="button_h1" type="button" value="H1" name="H1" title="Header H1" 
			onclick="insertTags('h','','')" class="bbcode_toolbar"/>
	<!--	<input id="button_h2" type="button" value="H2" name="H2" title="Header H2" 
			onclick="insertTags('h2','','')" class="bbcode_toolbar"/>
		<input id="button_h3" type="button" value="H3" name="H3" title="Header H3" 
			onclick="insertTags('h3','','')" class="bbcode_toolbar"/>
	-->
		&bull;
		<input id="button_list" type="button" value="UL" name="List" title="List" 
			onclick="insertTags('list','','')" class="bbcode_toolbar"/>
		<input id="button_list1" type="button" value="OL(1)" name="L(1)" title="numbered List" 
			onclick="insertTags('list=1','list','')" class="bbcode_toolbar"/>
		<input id="button_lista" type="button" value="OL(a)" name="L(a)" title="Alphabet List" 
			onclick="insertTags('list=a','list','')" class="bbcode_toolbar"/>
		<input id="button_star" type="button" value="LI" name="*" 
			onclick="insertTags('*','','')" class="bbcode_toolbar"/>
		&bull;
		<input id="button_url" type="button" value="Url" name="Url" title="Insert URL" 
			onclick="insertTags('url','','')" class="bbcode_toolbar"/>
		<input id="button_img" type="button" value="Img" name="Img" title="Insert Image" 
			onclick="insertTags('img','','')" class="bbcode_toolbar"/>
		<input id="button_code" type="button" value="Code" name="Code" title="Insert Code" 
			onclick="insertTags('code','','')" class="bbcode_toolbar"/>
		<input id="button_quote" type="button" value="Quote" name="Quote" title="Quote" 
			onclick="insertTags('quote','','')" class="bbcode_toolbar"/>
		<input id="button_email" type="button" value="Email" name="Email" title="Insert E-mail" 
			onclick="insertTags('email','','')" class="bbcode_toolbar"/>
		<input id="button_wiki" type="button" value="Wiki" name="Wiki" title="Insert Wiki links" 
			onclick="insertTags('wiki','','')" class="bbcode_toolbar"/>

		&bull;
		<input id="button_color" type="button" value="Color" name="Color" title="Color tag" 
			onclick="insertTags('color','','')" class="bbcode_toolbar"/>
		<input id="button_red" type="button" value="R" name="Red" title="Red color" 
			onclick="insertTags('color=#ff0000','','')" class="bbcode_toolbar"/>
		<input id="button_blue" type="button" value="B" name="Blue" title="Blue color" 
			onclick="insertTags('color=#0000ff','','')" class="bbcode_toolbar"/>
		<input id="button_magenta" type="button" value="M" name="Magenta" title="Magenta color" 
			onclick="insertTags('color=#FF00FF','','')" class="bbcode_toolbar"/>
		<input id="button_green" type="button" value="G" name="Green" title="Green color" 
			onclick="insertTags('color=#008000','','')" class="bbcode_toolbar"/>
	</span></div>
</div>
<!-- End of BBcode Toolbar -->
<?php
}
?>

