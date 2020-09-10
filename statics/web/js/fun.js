function validate_email($email) {
	var suf=$email.substr(-4);
	if(suf=='.ocm' || suf=='.con' || suf=='.xom' || suf=='.vom' || suf=='.met') return false;
	if($email.substr(-10)=='@gamil.com' || $email.substr(-3)=='.co') return false;
	if($email.substr(0,4)=='www.' && $email.substr(-6)=='qq.com') return false;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,11})?$/;
	return ( $email.length > 0 && emailReg.test($email));
}
function validate_nicename($nicename){
	var nicenameReg=/^[0-9a-zA-Z]{2,16}$/;
	return ( $nicename.length > 1 && nicenameReg.test($nicename));
}
function validate_url($url){
	var urlReg=/^https?:\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	return ( $url=="" || urlReg.test($url));
}
function validate_date($date){
	return $date=="" || !/Invalid|NaN/.test( new Date( $date ).toString());
}
function htmlspecialchars($str){
	$str=$str.replace(/&/g,'&amp;');
	$str=$str.replace(/"/g,'&quote;');
	$str=$str.replace(/'/g,'&#039;');
	$str=$str.replace(/</g,'&lt;');
	$str=$str.replace(/>/g,'&gt;');
	/*
	var f=['&','"',"'",'<','>'];
	var t=['&amp;','&quote;','&#039;','&lt;','&gt;'];
	for(var i=0; i<f.length; i++){
		var reg=new RegExp("/"+f[i]+"/","g");
		$str=$str.replace(reg,t[i]);
	}
	*/
	return $str;
}
Array.prototype.unique=function(){
	var arr=[];//创建新数组
	for(var i=0;i<this.length;i++){
		if(arr.indexOf(this[i]===-1)){
			arr.push(this[i]);
		}
	}
	return arr;
}
/////////////////js cookie functions ////////////////////////////
function create_cookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function read_cookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function delete_cookie(name) {
	//create_cookie(name, "", -1);//这个方法在三星手机浏览器中无效
	document.cookie = name + "=; max-age=0";
}
////////////////Mark user messages as read/////////////////////
function mark_messages_read(receiver_id, msg_id, auth){
	if(receiver_id==0){
		//not signed in
		var msgs=read_cookie('read_messages');
		if(msgs){
			var msg=msgs+','+msg_id;
			msg =msg.split(',').unique().join(',');
			delete_cookie('read_messages');
			create_cookie('read_messages',msg,3650);
			return true;
		}else{
			create_cookie('read_messages',msg_id,3650);
			console.log(msg_id);
			return true;
		}
	}
	if(receiver_id>0){
		console.log(msg_id);
		$.post('/?ajax=messages',{'receiver_id':receiver_id, 'msgs':msg_id, 'auth': auth}, function(data){});
		return true;
	}
	return false;
}
function fd_play(mp3){
	var audio= document.createElement("audio");
	audio.src=mp3;
	audio.play();
}
/*

*/