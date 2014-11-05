<#include "const.ftl">
<#include "../widget/input.ftl">

<#--
    解析保存的图片，获取正确尺寸的图片 .假设在保存的时候，顺序是L，M,S这样的顺序
-->
<#function getAvatar _imgurl _size = 'M'>
    <#local url = _imgurl!''>
    <#local size = _size?upper_case>
    <#local urls = url?split(',')>
    <#if (urls?size<3)>
        <#return url>
    <#else>
        <#if size == 'L'>
            <#return urls[0]>
        <#elseif size == 'M'>
            <#return urls[1]>
        <#else>
            <#return urls[2]>
        </#if>
    </#if>
</#function>

<#macro liveTextarea html = ''>
    ${html?html?replace('\n','<br/>','rmi')}
</#macro>
<#macro fixedFooter >
    <div class="m-footact">
        <div class="btns">
            <a href="javascript:;" class="w-button w-button-1 js-invite-friends">邀请好友</a>
            <a href="${contextPath}/activity/gift.do" class="w-button w-button-2">我的奖品</a>
        </div>
        <div class="txt">
            <div class="left">已成功邀请<span class="js-invited-count">0</span>位好友</div>
            <div class="right">已有<span class="js-invited-score">50</span>积分</div>
        </div>
        <a href="#top" class="w-totop js-gotop f-hide"></a>
    </div>
</#macro>

<#macro layout cssFiles="" jsFiles="" bodyCls="" appjs=true>

    <!DOCTYPE html>
    <html>
        <!-- manifest="${contextPath}/misc/sp.manifest" -->
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="gray"/>
            <title>邮箱大师推荐人计划</title>
            <#if appjs>
            <!--cssmerge_begin:appjs/app.css-->
            <link href="${stylePath}/appjs/app.css" rel="stylesheet" type="text/css"/>
            <!--cssmerge_end:appjs/app.css-->
            </#if>
            <!--cssmerge_begin:core.css-->
            <link href="${stylePath}/123.css" rel="stylesheet" type="text/css"/>
            <link href="${stylePath}/testing.css" rel="stylesheet" type="text/css"/>
            <!--cssmerge_end:core.css-->
            <!--[if IE]>
            <script>
                document.createElement("header");
                document.createElement("footer");
                document.createElement("nav");
                document.createElement("article");
                document.createElement("section");
            </script>
            <![endif]-->
            ${cssFiles}
            <!--
            <script src="http://10.240.136.154:9922/target/target-script-min.js#anonymous"></script>
            <script src="http://10.240.136.154:35729/livereload.js"></script>
            <script src="http://jsconsole.com/remote.js?9C92D5FE-43C0-4A30-BA95-F531E46B9271"></script>
            -->
        </head>
        <body class="${bodyCls}">

            <#nested>

            <div class="w-alert-mask f-hide" id="jsMask"></div>
            <div class="w-alert f-hide" id="jsAlert" style="left: 14px; top: 193px;">
                <div class="w-alert-bd">
                    <h3 class="w-msgbox-title">
                    </h3>
                    <span class="js-info"></span>
                </div>
                <div class="w-alert-ft">
                    <button class="btn" type="button" onclick="$('#jsAlert').addClass('f-hide');"><span>确定</span></button>
                </div>
            </div>
            <!--jsmerge_begin:c0.js-->
            <script type="text/javascript" src="${jsRoot}/123.js"></script>
            <script type="text/javascript" src="${jsRoot}/testing.js"></script>
            <!--jsmerge_end:c0.js-->

            <script type="text/javascript">
                seajs.config({
                    // 别名配置
                    alias: {
                    },

                    // 路径配置
                    paths: {
                    },

                    // 变量配置
                    vars: {
                    },

                    // 映射配置
                    map: [
                    ],

                    // 预加载项
                    preload: [
                    ],

                    // 调试模式
                    debug: true,

                    // Sea.js 的基础路径
                    <#if local || test>
                        base: '${jsRoot}/js/',
                    <#else>
                        base: '${jsRoot}/dist/',
                    </#if>

                    // 文件编码
                    charset: 'utf-8'
                });
                // 
                var gContextPath = "${contextPath}",gHost = '${host}',gMiscPath = '${miscPath}',gLocal = ${local?string};
                window.defaultMobile = '';
                window.product = '';
            </script>
            ${jsFiles}
        </body>

    </html>

</#macro>