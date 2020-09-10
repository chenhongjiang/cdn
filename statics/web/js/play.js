//播放js
function frame(play_url) {
    var height = 680;
    if (isMobile()){
        height = 260;
    }
    var  plays = '<iframe class="zanpiancms-play-iframe" id="buffer" src="'+play_url+'" width="100%" height="'+height+'" frameborder="0" scrolling="no"></iframe>';
    $(".play_video").html(plays);
}
function isMobile() {
    if(navigator.userAgent.match(/(iPhone|iPod|ipad|Android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|ios|skyfire)/i)){
        return true;
    }else{
        return false;
    }
}




