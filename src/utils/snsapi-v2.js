/*
 *post跨域
 *zhaozg
 */
import jQuery from 'jquery'
jQuery.xPoster = function (url ,data ,func) {
  var iframe = document.createElement("iframe")
  var ifmId = "Xposter" + (new Date()).getTime()
  document.body.appendChild(iframe)
  iframe.style.display = "none"
  iframe.contentWindow.name = ifmId

  var form = document.createElement("form")
  form.target = form.id = ifmId
  form.action = url
  form.method = "POST"

  $.each(data,function(name,val){
    var input = document.createElement("input")
    input.type = "hidden"
    input.name = name
    input.value = val
    form.appendChild(input)
  })

    document.body.appendChild(form)
    $('#' + ifmId).submit()
    setTimeout(function () { //
        alert('关注成功')
        window.location.reload()
    },1500)
}
var snsapi = {
	root:function(){
		var snshost = 'i.dxy.cn'
		if(location.host.search('dxy\.net') != -1){
			snshost = 'i.dxy.net'
		}
		return '//' + snshost + '/'
	},
	go:function(page,path,data,divId,target){

		var link = snsapi.root() + page + '#' + snsutil.toHash(page,path,data,divId)
		if("_blank" == snsutil.getValue(target, "_self")){
			window.open(link)
		}
		else{
			window.location.href = link
		}
	},
	follow:function(name,eltId,token,func){
		if(snsutil.isNotEmpty(name) && snsutil.isNotEmpty(eltId) && snsutil.isNotEmpty(token))
		{
            if (dxycnUserId !== 0) {
                $.xPoster(snsapi.root() + 'snsapi/friend/following/add/' + name, {eltId: eltId, csrfToken: token})
            }else{
                alert('未登录')
            }
		}
	},
	message:function(name,target,subject){
		// if(subject){
		// 	subject = escapeHtml(subject)
		// 	subject = subject.replace(/[\?]/g,'？')
		// 	subject = subject.replace(/[\/]/g,'、')
        //     /*
        //     ** 半角分号不能encodeURI(),而这回导致后台在丁香客发送消息页面无法根据url获得正确的「主题」数据信息
        //     ** zhaozg !!!
        //     */
		// 	subject = subject.replace(/[\]/g,'')
		// }
		// snsapi.go('home','message/write' + ((snsutil.getValue(name,'') == '')?'':('/' + name + ((snsutil.getValue(subject,'') == '')?'':('/' + subject)))),{},'content',snsutil.getValue(target,'_self'))
        snsapi.go('home','message/detail/', {
            username: snsutil.getValue(name,'')
        },'content',snsutil.getValue(target,'_self'))
	},
	shareFeed:function(body){
		var url = snsapi.root() + 'snsapi/share/feed?dataType=jsonp&callback=cb&body='+body
		$.ajax({
			   type: 'GET',
			    url: url,
			    async: false,
			    jsonpCallback: 'cb',
			    contentType: "application/json",
			    dataType: 'jsonp',
			    success: function(data) {
			    	if(data.status == 'ok'){
						alert('分享成功！')
					}else{
						if(data.message=='100'){
							alert('请先登录！')
						}else{
							alert('系统异常！')
						}
					}
			    }
			})
	}
}

snsapi.newtip = {
	id:"#sns-newtip",
	iid:null,
	show:function(type,page,anchor){
		if(snsutil.exists(snsapi.newtip.id)){
			jQuery.getScript(snsapi.root() + 'snsapi/home/newtip' + (snsutil.isEmpty(type)?'':('?act=clear&type=' + type)), function(){
				if(snsutil.isNotEmpty(type) && "all" == type){
					jQuery(snsapi.newtip.id).toggle(false)
				}
				else{
					var total=0
					if(typeof(snsnewstatus) != 'undefined'){
						jQuery.each(snsnewstatus, function(key, val) {
							if(snsutil.exists("sns-newtip-"+key)){
								jQuery("#sns-newtip-"+key + "-num").html(val)
								jQuery("#sns-newtip-"+key).toggle(val > 0)
								total +=val
							}

							if("unread" == key && snsutil.exists("leftnavmsg")){
								jQuery("#leftnavmsg").html(val)
								jQuery("#leftnavmsg").toggle(val > 0)
							}
						})
						showPushMessage(snsnewstatus)
					}
					jQuery("#sns-newtip-total-num").html(total)
					var newTipWrap = jQuery(snsapi.newtip.id).parent()
					if(newTipWrap[0].id == "newtip-fromdxy"){
						newTipWrap.toggle(total>0)
					}else{
						jQuery(snsapi.newtip.id).toggle(total>0)
					}

					if(snsutil.isNotEmpty(type) && snsutil.exists("sns-newtip-" + type) && snsutil.isNotEmpty(page) && snsutil.isNotEmpty(anchor)){
						window.location.href =  snsapi.root() + page + '#' + anchor
					}
				}
			})

			if(snsapi.newtip.iid != null){
				clearInterval(snsapi.newtip.iid)
			}
			snsapi.newtip.iid = setInterval('snsapi.newtip.show()',60000)
		}
	},
	follower:function(){
		snsapi.newtip.show("follower","friend", "follower")
	},
	reply:function(){
		snsapi.newtip.show("reply","home", "bbs/topic")
	},
	message:function(){
		snsapi.newtip.show("message","home", "inbox")
	},
	notice:function(){
		snsapi.newtip.show("notice","home", "notice/new")
	}
}

jQuery(function(){
	snsapi.newtip.show()
	//随机丁当
	$.fn.follow=function(options,callfn ){
		var sourceObj=this
		var offset=sourceObj.offset()
		var ie6=($.browser.version!=6.0)?false:true
		var objTop=0
		var defaults={
			checkWinOffset:1,
			initTop:offset.top,//防止锚点页刷新
			initLeft:offset.left,
			className:'followBox'
		}
		options=$.extend(defaults,options)

		var followBox=$("body").append("<div class='"+options.className+"'></div>").children("."+options.className)
		followBox.css("left",options.initLeft)
		sourceObj.appendTo(followBox).show()


		var getScrollTop=function(){
				if(document.documentElement.scrollTop>document.body.scrollTop){
					return document.documentElement.scrollTop
				}else{
					return document.body.scrollTop
				}
			}
		var checkPos=function(){
				return getScrollTop()>options.initTop
			}
		var checkAB=function(){
				toggleFollowBox(checkPos())
			}
		var toggleFollowBox=function(i){
				if(ie6){
					if(i){
						followBox.attr('class','followBoxTop0 followBox_ieTop0')
					}else{
						followBox.attr('class','followBoxTop0 followBox_ieTop')
					}
				}else{
					objTop=(i)?0:options.initTop
					followBox.css("top",objTop+"px")
				}

			}
		$(window).scroll(function(){
			checkAB()
		})
		return followBox
	}
})
var push_message_show = false
function showPushMessage(data){
	if(snsutil.exists("#randomBox") && data.push_msg_id && data.push_msg_text){
		$("#push-msg-content").empty()
		$("#push-msg-content").append(data.push_msg_text).append("<p id='push-msg-btn'><a href='javascript:void(0)' class='goLink' id='push-msg-link'>"+snsutil.getValue(data.buttonText, "知道了")+"</a></p>")
		$("#push-msg-link").click(function(){ //alert(1)
			pushMessageClick(data.push_msg_id)
		})
		if(!push_message_show){
			var nav_account=$('.nav_account')
			var nav_account_posLeft = 0
			function getAccountPosW(obj){
				var pp0=obj.offset()
				return pp0.left
			}
			nav_account_posLeft=getAccountPosW(nav_account)-145
			var followobj=$("#randomBox").follow({initTop:33,initLeft:nav_account_posLeft,className:'followBoxTop0'})

			window.winOffset=0
			function checkWinOffset(){
				var winWidth=document.documentElement.clientWidth
				if(winWidth!=window.winOffset){
					followobj.css('left',getAccountPosW(nav_account)-145+'px')
					window.winOffset=winWidth
				}
			}
			var tid0309=setInterval(checkWinOffset,2000)
		}
		push_message_show=true
	}
}
function pushMessageClick(id){
	$.ajax({
		type:'GET',
		url:snsapi.root() + "/snsapi/home/newtip/push/" + id ,
		dataType: 'script',
		success: function(){afterPushMessageRemoved()}
	})
}

export default snsapi 